# 🚀 PulseLink - Quick Reference Guide

## Command Cheat Sheet

### Development Commands

```bash
# Frontend
cd Pulse-link
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:ui      # Interactive test UI
npm run test:coverage # Coverage report

# Backend
cd server
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5000)
npm start            # Production start
npm test             # Run tests
```

---

## File Location Quick Reference

### Authentication & Auth
| Feature | Location |
|---------|----------|
| JWT Utils | `server/utils/auth.js` |
| Password/Token | `server/utils/auth.js` |
| Auth Store | `src/store/authStore.js` |
| Auth Service | `src/services/authService.js` |
| useAuth Hook | `src/hooks/useAuth.js` |
| Login Page | `src/Pages/EnhancedLoginPage.jsx` |
| Protected Route | `src/App.jsx` |

### State Management
| Store | Location |
|-------|----------|
| Auth State | `src/store/authStore.js` |
| Workout State | `src/store/workoutStore.js` |
| UI State | `src/store/uiStore.js` |

### API Services
| Service | Location |
|---------|----------|
| API Client | `src/services/apiClient.js` |
| Auth Service | `src/services/authService.js` |
| Exercise Service | `src/services/exerciseService.js` |
| Workout Service | `src/services/workoutService.js` |
| AI Service | `src/services/aiWorkoutService.js` |
| Stripe Service | `src/services/stripeService.js` |

### Components
| Component | Location |
|-----------|----------|
| Error Boundary | `src/components/ErrorBoundary.jsx` |
| Skeleton Loaders | `src/components/common/SkeletonLoader.jsx` |
| Theme Toggle | `src/components/common/ThemeToggle.jsx` |
| Notifications | `src/components/common/NotificationContainer.jsx` |
| Analytics | `src/components/dashboard/AnalyticsDashboard.jsx` |
| Leaderboard | `src/components/dashboard/Leaderboard.jsx` |
| Social | `src/components/dashboard/SocialFeatures.jsx` |
| Real-time | `src/hooks/useRealtimeWorkout.js` |

### Database Models
| Model | Location |
|-------|----------|
| User | `server/models/User.js` |
| Exercise | `server/models/Exercise.js` |
| Workout Plan | `server/models/WorkoutPlan.js` |
| Contact | `server/models/Contact.js` |

### Backend Middleware
| Middleware | Location |
|-----------|----------|
| Error Handler | `server/middleware/errorHandler.js` |
| Rate Limiter | `server/middleware/rateLimiter.js` |
| Validators | `server/utils/validators.js` |

---

## Common Code Snippets

### Use Auth Store
```javascript
import { useAuthStore } from '@/store/authStore';

const { user, token, logout } = useAuthStore();
```

### Use Workout Store
```javascript
import { useWorkoutStore } from '@/store/workoutStore';

const { exercises, filterExercises, getWorkoutStats } = useWorkoutStore();
```

### Use UI Store
```javascript
import { useUIStore } from '@/store/uiStore';

const { theme, setTheme, addNotification } = useUIStore();
```

### API Call
```javascript
import { exerciseService } from '@/services/exerciseService';

const exercises = await exerciseService.getExercises('cardio', 'beginner', 20);
```

### Real-time Workout
```javascript
import { useRealtimeWorkout } from '@/hooks/useRealtimeWorkout';

const { isConnected, workoutData, sendUpdate } = useRealtimeWorkout(workoutId);
```

### Add Notification
```javascript
import { useUIStore } from '@/store/uiStore';

const { addNotification } = useUIStore();

addNotification({
  type: 'success',
  message: 'Workout saved!'
});
```

### Protected Route
```javascript
<ProtectedRoute 
  element={<DashboardPage />} 
  isAuthenticated={isAuthenticated} 
/>
```

---

## Key Dependencies

### Frontend
```
zustand          - State management
axios            - HTTP client
framer-motion    - Animations
chart.js         - Analytics charts
socket.io-client - Real-time
stripe           - Payments
vitest           - Testing
```

### Backend
```
express          - Web server
mongoose         - MongoDB ORM
graphql          - API query language
socket.io        - Real-time
bcryptjs         - Password hashing
jsonwebtoken     - Auth tokens
express-validator - Input validation
```

---

## GraphQL Queries & Mutations

### Queries
```graphql
# Get current user
query {
  me {
    id name email role
  }
}

# Get exercises
query {
  getExercises(category: "cardio", difficulty: "beginner") {
    id name description duration
  }
}

# Search exercises
query {
  searchExercises(query: "squat") {
    id name
  }
}

# Get workout plans
query {
  getWorkoutPlans(userId: "123") {
    id name difficulty goal
  }
}
```

### Mutations
```graphql
# Register
mutation {
  register(name: "John", email: "john@example.com", password: "Pass123!") {
    success token user { id name }
  }
}

# Login
mutation {
  login(email: "john@example.com", password: "Pass123!") {
    success token user { id name }
  }
}

# Update profile
mutation {
  updateProfile(age: 25, weight: 75, fitnessLevel: "intermediate") {
    id profile { age weight }
  }
}

# Rate exercise
mutation {
  rateExercise(exerciseId: "123", rating: 5) {
    id rating
  }
}
```

---

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_SENTRY_DSN=https://...@sentry.io/...
```

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/pulselink
PORT=5000
JWT_SECRET=your_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

---

## Database Connection Strings

### Local MongoDB
```
mongodb://localhost:27017/pulselink
```

### MongoDB Atlas
```
mongodb+srv://username:password@cluster.mongodb.net/pulselink?retryWrites=true&w=majority
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB not connecting | Check if `mongod` is running or use Atlas |
| 401 errors on requests | Token may be expired, need to re-login |
| Socket.io not connecting | Check backend is running and CORS is configured |
| Build fails | Run `npm install` in both frontend and backend |
| Port already in use | Change PORT in `.env` or kill process using port |
| CORS errors | Check `FRONTEND_URL` in backend `.env` |
| Module not found | Check path aliases in `tsconfig.json` |

---

## Performance Tips

1. **Use Zustand selectors** for optimized re-renders
2. **Implement code splitting** for large components
3. **Cache API responses** with Service Worker
4. **Use skeleton loaders** for async data
5. **Debounce search** inputs
6. **Lazy load images** with intersection observer
7. **Optimize database queries** with MongoDB indexes
8. **Use Redis** for frequently accessed data

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Configure CORS origins properly
- [ ] Enable rate limiting
- [ ] Validate all inputs
- [ ] Hash passwords (bcryptjs)
- [ ] Keep dependencies updated
- [ ] Enable SNYK scanning
- [ ] Configure Sentry for monitoring
- [ ] Set secure cookies

---

## Deployment Checklist

- [ ] Set up MongoDB Atlas
- [ ] Configure Stripe live keys
- [ ] Setup Sentry project
- [ ] Configure AWS S3 (if needed)
- [ ] Setup Redis (if needed)
- [ ] Configure Vercel project
- [ ] Setup GitHub Actions secrets
- [ ] Enable HTTPS
- [ ] Configure CDN
- [ ] Setup monitoring

---

## Useful Links

| Resource | URL |
|----------|-----|
| Zustand Docs | https://github.com/pmndrs/zustand |
| Socket.io | https://socket.io/docs/ |
| GraphQL | https://graphql.org/learn/ |
| MongoDB | https://docs.mongodb.com/ |
| Stripe | https://stripe.com/docs/api |
| Sentry | https://docs.sentry.io/ |
| Vitest | https://vitest.dev/ |
| Vercel | https://vercel.com/docs |

---

## File Size Guide

```
Frontend
├── Bundle size: ~200KB (gzipped)
├── Main JS: ~150KB
└── CSS: ~50KB

Backend
├── Node modules: ~400MB
└── Source code: ~50KB
```

---

## Test Pattern Examples

```javascript
// Component test
describe('LoginPage', () => {
  it('should submit login form', async () => {
    render(<LoginPage />);
    // Test logic
  });
});

// Hook test
describe('useAuth', () => {
  it('should return user data', () => {
    const { result } = renderHook(() => useAuth());
    // Test hook
  });
});

// Service test
describe('authService', () => {
  it('should login user', async () => {
    const response = await authService.login('email', 'pass');
    // Test service
  });
});
```

---

## Performance Optimization Checklist

- [ ] Enable gzip compression
- [ ] Minimize bundle size
- [ ] Lazy load components
- [ ] Optimize images
- [ ] Cache static assets
- [ ] Use CDN
- [ ] Optimize database queries
- [ ] Implement pagination
- [ ] Use debouncing/throttling
- [ ] Monitor Core Web Vitals

---

## Monitoring & Debugging

### Browser DevTools
- React DevTools for state inspection
- Network tab for API calls
- Console for errors
- Performance tab for metrics

### Sentry Dashboard
- Real-time error tracking
- Performance monitoring
- Session replay
- Issue grouping

### GitHub Actions
- Build logs
- Deployment status
- Error summaries

---

**Last Updated**: December 28, 2025
**Quick Reference Version**: 1.0
