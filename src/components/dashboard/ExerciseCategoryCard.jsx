import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ExerciseCategoryCard = ({ name, description, imageUrl }) => (
  <Link to={`/exercises?category=${name.toLowerCase()}`}>
    <div className="group bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-green-500/50 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/10">
      <div className="aspect-square overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 capitalize">{name}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  </Link>
);

ExerciseCategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default ExerciseCategoryCard;