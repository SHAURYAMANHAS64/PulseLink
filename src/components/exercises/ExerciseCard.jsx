import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ExerciseCard = ({ id, name, target, equipment, imageUrl }) => {
  const secureImg = imageUrl && imageUrl.startsWith('http://')
    ? imageUrl.replace('http://', 'https://')
    : imageUrl;

  return (
    <Link to={`/exercise/${id}`} className="group block">
      <div className="bg-gray-800/70 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500/50 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-green-400/10">
        {secureImg ? (
          <img
            src={secureImg}
            alt={`${name} exercise`}
            loading="lazy"
            onError={e => {
              e.target.onerror = null;
              e.target.src = "/exercises/placeholder.jpg";
            }}
            className="w-full aspect-square object-cover bg-gray-900"
          />
        ) : (
          <div className="w-full aspect-square bg-gray-900 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <div className="p-4">
          <h3 className="text-base md:text-lg font-semibold capitalize truncate">{name}</h3>
          <p className="text-sm text-gray-400 capitalize truncate">🎯 Target: {target}</p>
          <p className="text-sm text-gray-400 capitalize truncate">⚙️ Equipment: {equipment}</p>
        </div>
      </div>
    </Link>
  );
};

ExerciseCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  equipment: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

ExerciseCard.defaultProps = {
  imageUrl: null
};

export default ExerciseCard;