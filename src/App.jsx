import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

function App() {
  try {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/exercise/:id" element={<ExerciseDetailPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    );
  } catch (error) {
    console.error('App Error:', error);
    return <div style={{ color: 'red', padding: '20px', fontFamily: 'sans-serif' }}>Error: {error.message}</div>;
  }
}

export default App;
