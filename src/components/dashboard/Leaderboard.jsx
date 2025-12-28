import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faMedal, faStar, faFire } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../services/apiClient.js';

const LeaderboardRow = ({ rank, user, score, type }) => {
  const getMedalIcon = (rank) => {
    if (rank === 1) return faTrophy;
    if (rank === 2) return faMedal;
    if (rank === 3) return faMedal;
    return null;
  };

  const getMedalColor = (rank) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-4 p-4 rounded-lg ${
        rank <= 3 ? 'bg-gradient-to-r from-gray-700 to-gray-800' : 'bg-gray-800/50'
      } hover:bg-gray-700 transition`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="text-2xl font-bold text-gray-400 w-8 text-center">
          {rank <= 3 && <FontAwesomeIcon icon={getMedalIcon(rank)} className={getMedalColor(rank)} />}
          {rank > 3 && <span className="text-gray-500">#{rank}</span>}
        </div>
        
        <div className="flex-1">
          <p className="text-white font-semibold">{user.name}</p>
          <p className="text-gray-400 text-sm">{user.role === 'trainer' ? 'Trainer' : 'User'}</p>
        </div>
      </div>

      <div className="text-right">
        <div className="flex items-center gap-1 text-yellow-400 mb-1">
          {Array(Math.min(5, Math.floor(user.rating || 0))).fill(0).map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="text-sm" />
          ))}
        </div>
        <p className="text-2xl font-bold text-white flex items-center gap-1">
          <FontAwesomeIcon icon={faFire} className="text-orange-500" />
          {score}
        </p>
      </div>
    </motion.div>
  );
};

export const Leaderboard = ({ type = 'weekly' }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        // Mock data - replace with actual API call
        const mockData = [
          { name: 'Alex Johnson', role: 'user', rating: 5, score: 2500 },
          { name: 'Sarah Smith', role: 'trainer', rating: 5, score: 3200 },
          { name: 'Mike Davis', role: 'user', rating: 4, score: 2100 },
          { name: 'Emma Wilson', role: 'user', rating: 4, score: 1950 },
          { name: 'John Brown', role: 'user', rating: 3, score: 1800 },
        ];
        setLeaderboard(mockData);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [type]);

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 text-2xl" />
        <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
        <div className="ml-auto">
          <select
            defaultValue={type}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-green-500 transition"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="alltime">All Time</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="text-gray-400">Loading leaderboard...</p>
        ) : (
          leaderboard.map((user, index) => (
            <LeaderboardRow
              key={index}
              rank={index + 1}
              user={user}
              score={user.score}
              type={type}
            />
          ))
        )}
      </div>
    </div>
  );
};
