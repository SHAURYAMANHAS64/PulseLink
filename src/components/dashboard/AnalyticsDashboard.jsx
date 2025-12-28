import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faClock, faHeartPulse, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useWorkoutStore } from '../store/workoutStore.js';
import { SkeletonLoader } from './common/SkeletonLoader.jsx';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const StatCard = ({ icon, label, value, color, unit = '' }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-br ${color} rounded-lg p-6 text-white`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-200 text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold">
          {value}
          <span className="text-lg ml-1">{unit}</span>
        </p>
      </div>
      <FontAwesomeIcon icon={icon} className="text-4xl opacity-30" />
    </div>
  </motion.div>
);

export const AnalyticsDashboard = () => {
  const { history, getWorkoutStats } = useWorkoutStore();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const stats = getWorkoutStats();
    setStats(stats);
    setLoading(false);
  }, [history, getWorkoutStats]);

  if (loading) {
    return <SkeletonLoader count={4} height="h-32" />;
  }

  const pieData = {
    labels: ['Cardio', 'Strength', 'Flexibility', 'Balance'],
    datasets: [
      {
        data: [30, 25, 25, 20],
        backgroundColor: [
          '#ff6b6b',
          '#4ecdc4',
          '#45b7d1',
          '#96ceb4'
        ],
        borderColor: '#111827',
        borderWidth: 2
      }
    ]
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Calories Burned',
        data: [120, 190, 150, 221, 200, 290],
        borderColor: '#00ff85',
        backgroundColor: 'rgba(0, 255, 133, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={faHeartPulse}
          label="Total Workouts"
          value={stats?.totalWorkouts || 0}
          color="from-red-600 to-pink-600"
        />
        <StatCard
          icon={faClock}
          label="Total Duration"
          value={Math.round(stats?.totalDuration / 60 || 0)}
          unit="min"
          color="from-blue-600 to-cyan-600"
        />
        <StatCard
          icon={faFire}
          label="Calories Burned"
          value={Math.round(stats?.totalCalories || 0)}
          unit="kcal"
          color="from-orange-600 to-red-600"
        />
        <StatCard
          icon={faTrophy}
          label="Average Rating"
          value={(stats?.averageRating || 0).toFixed(1)}
          unit="★"
          color="from-yellow-600 to-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 rounded-lg p-6"
        >
          <h3 className="text-white text-lg font-bold mb-4">Exercise Distribution</h3>
          <Pie data={pieData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 rounded-lg p-6"
        >
          <h3 className="text-white text-lg font-bold mb-4">Weekly Progress</h3>
          <Line data={lineData} options={{ plugins: { legend: { labels: { color: 'white' } } } }} />
        </motion.div>
      </div>
    </div>
  );
};
