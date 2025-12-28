import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';
import { useUIStore } from './store/uiStore.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Toaster from 'react-hot-toast';

// Pages
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import ExercisesPage from './Pages/ExercisesPage';
import ExerciseDetailPage from './Pages/ExerciseDetailPage';
import Contact from './Pages/Contact';
import ProgramPage from './Pages/Program';
import NutritionPage from './Pages/Nutrition';
import NotFoundPage from './Pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  const { isAuthenticated, loading } = useAuth();
  const { theme } = useUIStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute element={<DashboardPage />} isAuthenticated={isAuthenticated} />} 
            />
            <Route 
              path="/exercises" 
              element={<ProtectedRoute element={<ExercisesPage />} isAuthenticated={isAuthenticated} />} 
            />
            <Route 
              path="/exercise/:id" 
              element={<ProtectedRoute element={<ExerciseDetailPage />} isAuthenticated={isAuthenticated} />} 
            />
            <Route 
              path="/contact" 
              element={<Contact />} 
            />
            <Route 
              path="/program" 
              element={<ProtectedRoute element={<ProgramPage />} isAuthenticated={isAuthenticated} />} 
            />
            <Route 
              path="/nutrition" 
              element={<ProtectedRoute element={<NutritionPage />} isAuthenticated={isAuthenticated} />} 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="top-right" />
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
