import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

// Import models
import User from "./models/User.js";
import Exercise from "./models/Exercise.js";
import WorkoutPlan from "./models/WorkoutPlan.js";
import Contact from "./models/Contact.js";

// Import utilities
import { authMiddleware, generateToken, verifyToken } from "./utils/auth.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { validateEmail, validatePassword, validateName, handleValidationErrors } from "./utils/validators.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: [process.env.FRONTEND_URL || "http://localhost:5173", "http://localhost:5174"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL || "http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(rateLimiter(100, 15 * 60 * 1000)); // 100 requests per 15 minutes

// GraphQL TypeDefs
const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    profile: Profile
    subscriptionStatus: String!
    createdAt: String!
  }

  type Profile {
    age: Int
    height: Int
    weight: Int
    fitnessLevel: String
    goals: [String]
    bio: String
    avatar: String
  }

  type Exercise {
    id: ID!
    name: String!
    description: String
    category: String!
    difficulty: String!
    duration: Int
    videoUrl: String
    rating: Float!
    createdAt: String!
  }

  type WorkoutPlan {
    id: ID!
    name: String!
    userId: ID!
    duration: Int
    difficulty: String!
    goal: String
    isPublic: Boolean!
    followers: Int
    createdAt: String!
  }

  type Contact {
    id: ID!
    name: String!
    email: String!
    message: String!
    status: String!
    createdAt: String!
  }

  type AuthPayload {
    success: Boolean!
    token: String
    user: User
    message: String!
  }

  type Query {
    me: User
    getExercises(category: String, difficulty: String, limit: Int): [Exercise]
    getExerciseById(id: ID!): Exercise
    getWorkoutPlans(userId: ID!): [WorkoutPlan]
    getContacts: [Contact]
    searchExercises(query: String!): [Exercise]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateProfile(age: Int, height: Int, weight: Int, fitnessLevel: String): User
    createExercise(
      name: String!
      description: String
      category: String!
      difficulty: String
      duration: Int
      videoUrl: String
    ): Exercise
    createWorkoutPlan(
      name: String!
      description: String
      exercises: [ID]
      difficulty: String
      goal: String
    ): WorkoutPlan
    createContact(name: String!, email: String!, message: String!): Contact!
    rateExercise(exerciseId: ID!, rating: Int!): Exercise
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user.userId);
    },

    getExercises: async (_, { category, difficulty, limit = 20 }) => {
      const query = {};
      if (category) query.category = category;
      if (difficulty) query.difficulty = difficulty;
      return await Exercise.find(query).limit(limit);
    },

    getExerciseById: async (_, { id }) => {
      return await Exercise.findById(id);
    },

    getWorkoutPlans: async (_, { userId }) => {
      return await WorkoutPlan.find({ 
        $or: [{ userId }, { isPublic: true }] 
      }).sort({ createdAt: -1 });
    },

    getContacts: async (_, __, { user }) => {
      if (user?.role !== 'admin') throw new Error("Admin access required");
      return await Contact.find().sort({ createdAt: -1 });
    },

    searchExercises: async (_, { query }) => {
      return await Exercise.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      });
    }
  },

  Mutation: {
    register: async (_, { name, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            success: false,
            message: "Email already registered"
          };
        }

        const user = new User({ name, email, password });
        await user.save();

        const token = generateToken(user._id, user.role);
        return {
          success: true,
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
          },
          message: "Registration successful"
        };
      } catch (error) {
        return {
          success: false,
          message: error.message
        };
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
          return {
            success: false,
            message: "Invalid credentials"
          };
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
          return {
            success: false,
            message: "Invalid credentials"
          };
        }

        const token = generateToken(user._id, user.role);
        return {
          success: true,
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
          },
          message: "Login successful"
        };
      } catch (error) {
        return {
          success: false,
          message: error.message
        };
      }
    },

    updateProfile: async (_, args, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findByIdAndUpdate(
        user.userId,
        { profile: args },
        { new: true }
      );
    },

    createExercise: async (_, args, { user }) => {
      if (user?.role !== 'admin' && user?.role !== 'trainer') {
        throw new Error("Admin or trainer access required");
      }
      const exercise = new Exercise({
        ...args,
        createdBy: user.userId
      });
      return await exercise.save();
    },

    createWorkoutPlan: async (_, args, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const plan = new WorkoutPlan({
        ...args,
        userId: user.userId
      });
      return await plan.save();
    },

    createContact: async (_, { name, email, message }) => {
      const contact = new Contact({ name, email, message });
      await contact.save();
      return contact;
    },

    rateExercise: async (_, { exerciseId, rating }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }

      const exercise = await Exercise.findById(exerciseId);
      const newRating = (exercise.rating * exercise.ratingCount + rating) / (exercise.ratingCount + 1);
      exercise.rating = newRating;
      exercise.ratingCount += 1;
      return await exercise.save();
    }
  }
};

// Start Server
async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // Setup Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        const user = authMiddleware(req);
        return { user };
      },
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    // REST API middleware
    app.use(express.json());

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // WebSocket connections
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('join-workout', (workoutId) => {
        socket.join(`workout-${workoutId}`);
        io.to(`workout-${workoutId}`).emit('user-joined', socket.id);
      });

      socket.on('workout-update', (data) => {
        io.to(`workout-${data.workoutId}`).emit('update', data);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    // Error handlers
    app.use(notFoundHandler);
    app.use(errorHandler);

    // Start server
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📊 GraphQL available at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
