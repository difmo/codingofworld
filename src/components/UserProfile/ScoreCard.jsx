// src/components/ScoreCard.js
import React from 'react';

const ScoreCard = ({ title, score, iconSrc, iconAlt }) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-sm font-medium">{title}</div>
      <div className="flex items-center space-x-2">
        <div className="text-lg font-bold">{score}</div>
        <img src={iconSrc} alt={iconAlt} className="w-6 h-6" />
      </div>
    </div>
  );
};

export default ScoreCard;
