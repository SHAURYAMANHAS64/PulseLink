import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NextExerciseCard = ({ exercise }) => {
  // Early return if no exercise data
  if (!exercise) {
    return null;
  }

  // Ensure image URL is secure
  const secureImageUrl = exercise.imageUrl?.startsWith('http://')
    ? exercise.imageUrl.replace('http://', 'https://')
    : exercise.imageUrl;

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl mt-12 border border-gray-700 shadow-lg hover:shadow-green-500/10 transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-green-400 mb-6">Next Recommended Exercise</h3>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Next Up</p>
            <h4 className="text-lg font-semibold text-white capitalize">{exercise.name}</h4>
          </div>
          <p className="text-gray-300 line-clamp-3">{exercise.description}</p>
          <div className="flex gap-4">
            <Link 
              to={`/exercise/${exercise.id}`}
              className="inline-block bg-green-500 hover:bg-green-600 text-black transition-all duration-150 px-5 py-2 rounded-lg font-medium"
              aria-label={`Start ${exercise.name} exercise`}
            >
              Start Exercise
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-48 h-36 rounded-xl overflow-hidden flex-shrink-0 bg-gray-900">
          {secureImageUrl ? (
            <img 
              src={secureImageUrl}
              alt={`${exercise.name} exercise demonstration`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/exercises/placeholder.jpg";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

NextExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    target: PropTypes.string,
    equipment: PropTypes.string
  })
};

NextExerciseCard.defaultProps = {
  exercise: null
};

export default NextExerciseCard;
