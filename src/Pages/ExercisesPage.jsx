import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppNavbar from '../components/common/AppNavbar';
import ExerciseCard from '../components/exercises/ExerciseCard';


const CardSkeleton = () => (
  <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 animate-pulse">
    <div className="aspect-square bg-gray-700"></div>
    <div className="p-4 space-y-2">
      <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
      <div className="h-4 w-full bg-gray-700 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
    </div>
  </div>
);

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(40);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bodyParts = [
    'all','back','cardio','chest','lower arms','lower legs',
    'neck','shoulders','upper arms','upper legs','waist'
  ];

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        // Fetch the JSON from GitHub
        const url = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
        const response = await axios.get(url);
        const data = response.data.map(ex => {
          // Build image URL if images array exists
          let imgUrl = '';
          if (ex.images && ex.images.length > 0) {
            imgUrl = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${ex.images[0]}`;
          }
          return {
            id: ex.id,
            name: ex.name,
            target: Array.isArray(ex.primaryMuscles) && ex.primaryMuscles.length > 0
                     ? ex.primaryMuscles[0]
                     : ex.primaryMuscles?.join(', ') || '',
            equipment: ex.equipment || '',
            imageUrl: imgUrl
          };
        });
        setExercises(data);
        setFilteredExercises(data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch exercises. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearch(q);
    if (!q) {
      setFilteredExercises(exercises);
      return;
    }
    const filtered = exercises.filter(ex =>
      ex.name.toLowerCase().includes(q) ||
      ex.target.toLowerCase().includes(q) ||
      ex.equipment.toLowerCase().includes(q)
    );
    setFilteredExercises(filtered);
    setVisibleCount(40);
  };

  const handleFilterChange = (bodyPart) => {
    let filtered;
    if (bodyPart === 'all') {
      filtered = exercises;
    } else {
      filtered = exercises.filter(ex =>
        ex.target.toLowerCase() === bodyPart.toLowerCase() ||
        ex.equipment.toLowerCase().includes(bodyPart.toLowerCase()) ||
        ex.name.toLowerCase().includes(bodyPart.toLowerCase())
      );
    }
    setFilteredExercises(filtered);
    setVisibleCount(40);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 40);
  };

  return (
    <div className="bg-[#0f172a] text-white font-sans min-h-screen">
      <AppNavbar />
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-400">🏋️ Explore Exercises</h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search exercises..."
            className="w-full max-w-md px-4 py-2 rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex gap-2 md:gap-4 mb-10 overflow-x-auto scrollbar-hide justify-center">
          {bodyParts.map(part => (
            <button
              key={part}
              onClick={() => handleFilterChange(part)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold whitespace-nowrap transition-all ${
                filteredExercises && filteredExercises.length && filteredExercises[0] &&
                filteredExercises[0].target.toLowerCase() === part
                  ? 'bg-green-500 text-black shadow-md'
                  : 'bg-gray-700/50 hover:bg-gray-600/50'
              }`}
            >
              <span className="capitalize">{part}</span>
            </button>
          ))}
        </div>

        {error && (
          <div className="text-center text-red-500 bg-red-500/10 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {loading ? (
            Array.from({ length: 12 }).map((_, index) => <CardSkeleton key={index} />)
          ) : (
            filteredExercises.slice(0, visibleCount).map(exercise => (
              <ExerciseCard
                key={exercise.id}
                id={exercise.id}
                name={exercise.name}
                target={exercise.target}
                equipment={exercise.equipment}
                imageUrl={exercise.imageUrl}
              />
            ))
          )}
        </div>

        {!loading && visibleCount < filteredExercises.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-green-500 text-black rounded-full font-semibold hover:bg-green-400 transition"
            >
              Load More Exercises
            </button>
          </div>
        )}

        {!loading && filteredExercises.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No exercises found for this category or search.</p>
          </div>
        )}
      </main>
    </div>
  );
}
