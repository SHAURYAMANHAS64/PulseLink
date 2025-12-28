import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faWifiSlash } from '@fortawesome/free-solid-svg-icons';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useRealtimeWorkout = (workoutId) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [workoutData, setWorkoutData] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('join-workout', workoutId);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('update', (data) => {
      setWorkoutData(data);
    });

    newSocket.on('user-joined', (userId) => {
      setActiveUsers(prev => [...new Set([...prev, userId])]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [workoutId]);

  const sendUpdate = (data) => {
    if (socket && isConnected) {
      socket.emit('workout-update', {
        workoutId,
        ...data
      });
    }
  };

  return { socket, isConnected, workoutData, activeUsers, sendUpdate };
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
        <span className={isConnected ? 'text-green-400' : 'text-red-400'} className="text-sm">
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
