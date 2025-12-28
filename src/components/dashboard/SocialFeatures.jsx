import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faHeart, faComment, faFire } from '@fortawesome/free-solid-svg-icons';

export const WorkoutSocialCard = ({ workout, onShare, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(workout.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(workout.id);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-lg p-6 space-y-4"
    >
      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={workout.userAvatar || '/default-avatar.png'}
          alt={workout.userName}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-white font-semibold">{workout.userName}</p>
          <p className="text-gray-400 text-xs">{workout.timeAgo}</p>
        </div>
      </div>

      {/* Workout Details */}
      <div>
        <h3 className="text-white font-bold text-lg mb-2">{workout.title}</h3>
        <p className="text-gray-300 text-sm mb-3">{workout.description}</p>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-700/50 rounded p-2 text-center">
            <p className="text-gray-400 text-xs">Duration</p>
            <p className="text-green-400 font-bold">{workout.duration}min</p>
          </div>
          <div className="bg-gray-700/50 rounded p-2 text-center">
            <p className="text-gray-400 text-xs">Calories</p>
            <p className="text-orange-400 font-bold">{workout.calories}kcal</p>
          </div>
          <div className="bg-gray-700/50 rounded p-2 text-center">
            <p className="text-gray-400 text-xs">Intensity</p>
            <p className="text-red-400 font-bold">{workout.intensity}</p>
          </div>
        </div>
      </div>

      {/* Social Actions */}
      <div className="flex gap-4 text-gray-400 text-sm">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLike}
          className={`flex items-center gap-2 transition ${
            isLiked ? 'text-red-500' : 'hover:text-red-500'
          }`}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span>{likes}</span>
        </motion.button>
        <button className="flex items-center gap-2 hover:text-blue-500 transition">
          <FontAwesomeIcon icon={faComment} />
          <span>{workout.comments || 0}</span>
        </button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onShare?.(workout)}
          className="flex items-center gap-2 hover:text-green-500 transition"
        >
          <FontAwesomeIcon icon={faShare} />
          <span>Share</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export const CommunityChallenge = ({ challenge }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg p-6 border border-purple-500/30"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-bold text-lg">{challenge.name}</h3>
          <p className="text-gray-300 text-sm">{challenge.description}</p>
        </div>
        <FontAwesomeIcon icon={faFire} className="text-orange-400 text-2xl" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-900/50 rounded p-3">
          <p className="text-gray-400 text-xs mb-1">Participants</p>
          <p className="text-white font-bold text-lg">{challenge.participants}</p>
        </div>
        <div className="bg-gray-900/50 rounded p-3">
          <p className="text-gray-400 text-xs mb-1">Days Left</p>
          <p className="text-white font-bold text-lg">{challenge.daysLeft}</p>
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
          style={{ width: `${challenge.progress}%` }}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
      >
        {challenge.joined ? 'View Progress' : 'Join Challenge'}
      </motion.button>
    </motion.div>
  );
};
