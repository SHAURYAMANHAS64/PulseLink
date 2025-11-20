import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// --- AppNavbar Component (Included locally to fix import error) ---
const AppNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-[#111827]/90 backdrop-blur-lg fixed top-0 left-0 w-full z-50 py-4 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="text-2xl font-bold text-white hover:text-green-400 transition-colors">
            PulseLink
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/exercises" className="text-gray-300 hover:text-green-400 transition-colors">Exercises</Link>
            <Link to="/programs" className="text-gray-300 hover:text-green-400 transition-colors">Programs</Link>
            <Link to="/nutrition" className="text-green-400 transition-colors">Nutrition</Link>
            <Link to="/community" className="text-gray-300 hover:text-green-400 transition-colors">Community</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-white font-medium hidden sm:block">Hi, {user.name}</span>
              <button onClick={handleLogout} className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-sm border border-red-500/20">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-green-400/10 hover:text-green-400 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          )}
          <button className="md:hidden h-10 w-10 flex items-center justify-center rounded-full text-gray-300 hover:bg-green-400/10 hover:text-green-400 transition-all" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden px-6 py-4 bg-[#1a2234] border-t border-gray-700 absolute w-full">
          <div className="flex flex-col space-y-4 text-center">
            <Link to="/exercises" className="text-gray-300 hover:text-green-400 py-2">Exercises</Link>
            <Link to="/programs" className="text-gray-300 hover:text-green-400 py-2">Programs</Link>
            <Link to="/nutrition" className="text-green-400 py-2">Nutrition</Link>
            <Link to="/community" className="text-gray-300 hover:text-green-400 py-2">Community</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

// --- Reusable Card Components ---

const DietCard = ({ title, items, icon }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/30 transition-all">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-xl font-semibold text-green-400 capitalize">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-300 flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
          <span className="text-sm md:text-base">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const RecommendedExerciseCard = ({ exercise }) => (
  <Link to={`/exercise/${exercise.id}`} className="block group">
    <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all hover:-translate-y-1">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={exercise.imageUrl} 
          alt={exercise.name} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Exercise'; }}
        />
      </div>
      <div className="p-4">
        <h4 className="font-bold text-white truncate capitalize">{exercise.name}</h4>
        <p className="text-sm text-gray-400 capitalize">{exercise.target}</p>
      </div>
    </div>
  </Link>
);

// --- Main Component ---

const NutritionPage = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiData, setBmiData] = useState(null);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  
  // State for API data
  const [suggestedExercises, setSuggestedExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]);

  // 1. Load Exercise Data on Mount (Background Fetch)
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const url = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
        const response = await axios.get(url);
        setAllExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises", error);
      }
    };
    fetchExercises();
  }, []);

  // 2. Calculation Logic
  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    setLoadingRecipes(true);

    const h = height / 100;
    const bmiValue = (weight / (h * h)).toFixed(1);
    let category = '';
    let advice = '';
    let dietPlan = {};
    let workoutFilter = ''; // Used to filter API exercises

    // --- Logic for BMI Categories ---
    if (bmiValue < 18.5) {
      category = 'Underweight';
      advice = 'Focus on a caloric surplus with nutrient-dense foods to build mass. Prioritize strength training to convert calories into muscle.';
      workoutFilter = 'strength'; // We will look for compound lifts
      dietPlan = {
        breakfast: ['Oatmeal with peanut butter, banana & whole milk', '3 Scrambled eggs with avocado toast'],
        lunch: ['Grilled chicken breast with large portion of brown rice', 'Pasta with meat sauce & vegetables'],
        dinner: ['Salmon or Steak with sweet potatoes', 'Quinoa bowl with black beans & cheese'],
        snacks: ['Greek yogurt with honey & nuts', 'Protein shake with whole milk', 'Trail mix']
      };
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      category = 'Healthy Weight';
      advice = 'Great job! Maintain your physique with a balanced macro split (40/30/30). Mix cardio and strength training for longevity.';
      workoutFilter = 'mix'; // Mix of everything
      dietPlan = {
        breakfast: ['Oatmeal with berries & protein powder', 'Avocado toast with poached egg'],
        lunch: ['Turkey wrap with plenty of greens', 'Grilled chicken salad with vinaigrette'],
        dinner: ['Baked fish with asparagus & wild rice', 'Stir-fry tofu with mixed vegetables'],
        snacks: ['Apple with almond butter', 'Hard-boiled eggs', 'Cottage cheese']
      };
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      category = 'Overweight';
      advice = 'Aim for a slight caloric deficit (-300 to -500 kcal). Focus on high-volume, low-calorie foods (vegetables) and increase daily activity.';
      workoutFilter = 'cardio'; // Focus on cardio/HIIT
      dietPlan = {
        breakfast: ['Egg white omelet with spinach & mushrooms', 'Greek yogurt with low-sugar berries'],
        lunch: ['Large grilled chicken salad (light dressing)', 'Tuna lettuce wraps'],
        dinner: ['White fish with steamed broccoli', 'Zucchini noodles with marinara sauce'],
        snacks: ['Carrot sticks with hummus', 'Handful of almonds', 'Celery sticks']
      };
    } else {
      category = 'Obese';
      advice = 'Focus on consistency and sustainable changes. Prioritize low-impact cardio to protect joints and strictly manage portion sizes.';
      workoutFilter = 'low-impact'; // Cardio but gentle
      dietPlan = {
        breakfast: ['Green smoothie (Spinach, apple, protein)', 'Boiled eggs with slice of whole grain toast'],
        lunch: ['Lentil soup with side salad', 'Grilled chicken breast with steamed veggies'],
        dinner: ['Baked cod with green beans', 'Turkey chili (bean heavy, low meat)'],
        snacks: ['Cucumber slices', 'Air-popped popcorn (no butter)', 'Sugar-free gelatin']
      };
    }

    // 3. Filter Exercises based on BMI result
    filterExercisesForBMI(workoutFilter);

    setBmiData({ value: bmiValue, category, advice, dietPlan });
    setLoadingRecipes(false);
  };

  const filterExercisesForBMI = (filterType) => {
    if (!allExercises.length) return;

    let filtered = [];
    
    if (filterType === 'strength') {
      // Filter for compound movements usually good for mass
      filtered = allExercises.filter(ex => 
        ['chest', 'quadriceps', 'back'].includes(ex.primaryMuscles[0])
      );
    } else if (filterType === 'cardio' || filterType === 'low-impact') {
      // Filter for cardio exercises
      filtered = allExercises.filter(ex => 
        ex.category === 'cardio' || ex.primaryMuscles[0] === 'cardio'
      );
      // If API doesn't categorize clearly, we look for specific keywords
      if (filtered.length < 3) {
         filtered = allExercises.filter(ex => ex.name.toLowerCase().includes('run') || ex.name.toLowerCase().includes('jump') || ex.name.toLowerCase().includes('walk'));
      }
    } else {
      // Healthy - random mix
      filtered = allExercises;
    }

    // Shuffle and take 4
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    // Process images
    const processed = shuffled.map(ex => ({
      ...ex,
      imageUrl: ex.images && ex.images.length > 0 
        ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${ex.images[0]}`.replace('http://', 'https://')
        : 'https://placehold.co/400x300?text=Exercise' 
    }));

    setSuggestedExercises(processed);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen font-sans text-white pb-20">
      <AppNavbar />
      
      <div className="max-w-6xl mx-auto px-6 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Smart <span className="text-green-400">Nutrition</span> Calculator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Calculate your BMI to receive AI-powered diet plans and workout recommendations tailored specifically to your body type.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-xl mx-auto bg-gray-800/30 border border-gray-700 p-8 rounded-2xl shadow-xl mb-16">
          <form onSubmit={calculateBMI} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition-all transform active:scale-95"
            >
              Calculate & Generate Plan
            </button>
          </form>
        </div>

        {/* RESULTS SECTION */}
        {bmiData && (
          <div className="animate-fade-in space-y-16">
            
            {/* 1. BMI Score Card */}
            <div className="text-center bg-gray-800/30 border border-gray-700 rounded-2xl p-8">
              <p className="text-gray-400 uppercase text-sm font-bold tracking-wider mb-2">Your Result</p>
              <h2 className="text-5xl font-bold text-white mb-2">{bmiData.value}</h2>
              <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-6 
                ${bmiData.category === 'Healthy Weight' ? 'bg-green-500/20 text-green-400' : 
                  bmiData.category === 'Obese' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {bmiData.category}
              </div>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                {bmiData.advice}
              </p>
            </div>

            {/* 2. Diet Plan */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-green-400">🥗</span> Recommended Diet Plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DietCard title="Breakfast" items={bmiData.dietPlan.breakfast} icon="🍳" />
                <DietCard title="Lunch" items={bmiData.dietPlan.lunch} icon="🍗" />
                <DietCard title="Dinner" items={bmiData.dietPlan.dinner} icon="🍲" />
                <DietCard title="Snacks" items={bmiData.dietPlan.snacks} icon="🥜" />
              </div>
            </div>

            {/* 3. Recommended Exercises */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-green-400">💪</span> Recommended Workouts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {suggestedExercises.map((ex, i) => (
                  <RecommendedExerciseCard key={i} exercise={ex} />
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionPage;