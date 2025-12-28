import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    enum: ['cardio', 'strength', 'flexibility', 'balance', 'sports'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  duration: Number, // in seconds
  caloriesBurn: {
    min: Number,
    max: Number
  },
  videoUrl: String,
  instructions: [String],
  equipment: [String],
  muscles: [String],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  ratingCount: { type: Number, default: 0 },
  createdBy: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Exercise', exerciseSchema);
