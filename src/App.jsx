import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import ExercisesPage from './Pages/ExercisesPage';
import ExerciseDetailPage from './Pages/ExerciseDetailPage';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/exercise/:id" element={<ExerciseDetailPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
