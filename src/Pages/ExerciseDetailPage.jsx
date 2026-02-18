import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ExerciseTimer from '../components/exercise-detail/ExerciseTimer';
import NextExerciseCard from '../components/exercise-detail/NextExerciseCard';
// import AppNavbar from '../components/common/AppNavbar'; // Removed failing import

// --- Placeholder AppNavbar ---
// Added this component locally to fix the error
const AppNavbar = () => {
  return (
    <header className="bg-gray-900/50 py-4 shadow-lg backdrop-blur-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-green-400">
          PulseLink
        </Link>
        <div className="flex space-x-4">
          <Link to="/exercises" className="text-gray-300 hover:text-green-400">
            Exercises
          </Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-green-400">
            Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
};



const SkeletonLoader = () => (
  <div className="max-w-4xl mx-auto px-6 py-12 animate-pulse">
    <div className="w-full h-80 bg-gray-700 rounded-2xl"></div>
    <div className="h-10 w-3/4 bg-gray-700 rounded mt-10"></div>
    <div className="h-6 w-full bg-gray-700 rounded mt-4"></div>
    <div className="h-6 w-5/6 bg-gray-700 rounded mt-2"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="h-24 bg-gray-700 rounded-xl"></div>
      <div className="h-24 bg-gray-700 rounded-xl"></div>
    </div>
    <div className="h-40 bg-gray-700 rounded-2xl mt-8"></div>
  </div>
);

// --- Main Page Component ---

export default function ExerciseDetailPage() {
  const { id } = useParams(); // Get the exercise ID from the URL
  const [exercise, setExercise] = useState(null);
  const [recommendedExercise, setRecommendedExercise] = useState(null); // State for next exercise
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      try {
        setLoading(true);
        setExercise(null);
        setRecommendedExercise(null);
        // We must fetch the entire list to find our one exercise
        const url = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
        const response = await axios.get(url);
        const allExercises = response.data;
        
        // Find the exercise with the matching ID
        const foundExercise = allExercises.find(ex => ex.id === id);
        
        if (foundExercise) {
          // Process the current exercise data
          let imgUrl = "https://placehold.co/800x400?text=Exercise";
          if (foundExercise.images && foundExercise.images.length > 0) {
            imgUrl = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${foundExercise.images[0]}`;
            imgUrl = imgUrl.replace('http://', 'https://');
          }

          setExercise({
            id: foundExercise.id,
            name: foundExercise.name,
            target: foundExercise.primaryMuscles?.join(', ') || 'N/A',
            secondary: foundExercise.secondaryMuscles?.join(', ') || 'N/A',
            equipment: foundExercise.equipment || 'N/A',
            instructions: foundExercise.instructions || [],
            imageUrl: imgUrl
          });
          setError(null);

          // --- Find Recommended Exercise ---
          const currentTarget = foundExercise.primaryMuscles[0];
          let nextExercise = allExercises.find(ex => 
              ex.id !== foundExercise.id && 
              ex.primaryMuscles && 
              ex.primaryMuscles[0] === currentTarget
          );

          // If no match, pick another exercise from the same equipment category
          if (!nextExercise) {
            nextExercise = allExercises.find(ex =>
              ex.id !== foundExercise.id &&
              ex.equipment === foundExercise.equipment
            );
          }

          // If still no match, just pick a random one
          if (!nextExercise) {
            const otherExercises = allExercises.filter(ex => ex.id !== foundExercise.id);
            nextExercise = otherExercises[Math.floor(Math.random() * otherExercises.length)];
          }

          // Process the nextExercise to add imageUrl etc.
          if (nextExercise) {
              let nextImgUrl = "https://placehold.co/400x400?text=Next";
              if (nextExercise.images && nextExercise.images.length > 0) {
                  nextImgUrl = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${nextExercise.images[0]}`;
                  nextImgUrl = nextImgUrl.replace('http://', 'https://');
              }
              setRecommendedExercise({
                  id: nextExercise.id,
                  name: nextExercise.name,
                  description: `A great follow-up exercise targeting ${nextExercise.primaryMuscles[0] || 'your muscles'}.`,
                  imageUrl: nextImgUrl
              });
          }
          // --- End of Recommendation Logic ---

        } else {
          setError('Exercise not found.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch exercise details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseDetail();
  }, [id]); // Re-fetch if the ID in the URL changes

  return (
    <div className="bg-[#0f172a] text-white font-sans min-h-screen pb-20">
      <AppNavbar />
      <main>
        {loading && <SkeletonLoader />}
        
        {error && (
          <div className="text-center text-red-500 bg-red-500/10 p-4 rounded-lg max-w-4xl mx-auto mt-10">
            {error}
          </div>
        )}

        {exercise && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Hero Image */}
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-10">
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x400?text=No+Image";
                }}
              />
            </div>

            {/* Exercise Details */}
            <div className="space-y-8">
              <h1 className="text-3xl md:text-4xl font-bold capitalize text-green-400">{exercise.name}</h1>
              
              {/* Info Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                  <h3 className="font-semibold text-gray-400 mb-1 text-sm">🎯 Primary Target</h3>
                  <p className="text-white text-lg font-medium capitalize">{exercise.target}</p>

                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                  <h3 className="font-semibold text-gray-400 mb-1 text-sm">💪 Secondary Muscles</h3>
                  <p className="text-white text-lg font-medium capitalize">{exercise.secondary}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                  <h3 className="font-semibold text-gray-400 mb-1 text-sm">⚙️ Equipment</h3>
                  <p className="text-white text-lg font-medium capitalize">{exercise.equipment}</p>
                </div>
              </div>

              {/* Instructions */}
              {exercise.instructions.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Instructions</h2>
                  <ol className="list-decimal list-outside space-y-3 pl-5 text-gray-300 text-lg leading-relaxed">
                    {exercise.instructions.map((step, index) => (
                      <li key={index} className="pl-2">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Timer Component */}
            <div className="flex justify-center items-center">
              <ExerciseTimer />
            </div>
            
            {/* Next Exercise Card (now passes the dynamic exercise) */}
            <NextExerciseCard exercise={recommendedExercise} />
          </div>
        )}
      </main>
    </div>
  );
}

