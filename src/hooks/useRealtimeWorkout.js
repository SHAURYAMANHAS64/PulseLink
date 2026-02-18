// Mock real-time workout hook - no backend connection required
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faWifiSlash } from '@fortawesome/free-solid-svg-icons';

// Mock implementation - returns offline state
export const useRealtimeWorkout = (workoutId) => {
  const [isConnected] = useState(false);
  const [workoutData] = useState(null);
  const [activeUsers] = useState([]);

  const sendUpdate = (data) => {
    console.log('Mock sendUpdate (no backend):', { workoutId, ...data });
  };

  return { socket: null, isConnected, workoutData, activeUsers, sendUpdate };
};

export const RealtimeWorkoutStatus = ({ workoutId }) => {
  const { isConnected, activeUsers, workoutData } = useRealtimeWorkout(workoutId);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
    >
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={isConnected ? faWifi : faWifiSlash}
          className={isConnected ? 'text-green-500' : 'text-red-500'}
        />
        <span className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
          {isConnected ? 'Live' : 'Offline'}
        </span>
      </div>

      {activeUsers.length > 0 && (
        <div className="text-sm text-gray-300">
          {activeUsers.length} user{activeUsers.length !== 1 ? 's' : ''} active
        </div>
      )}

      {workoutData && (
        <div className="text-sm text-gray-300">
          Duration: {workoutData.duration}s | Calories: {workoutData.caloriesBurned}
        </div>
      )}
    </motion.div>
  );
};
