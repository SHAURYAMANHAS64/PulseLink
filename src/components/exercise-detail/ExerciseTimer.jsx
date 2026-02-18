import React from 'react';
import { useStopwatch } from '../../hooks/useStopwatch';
import PropTypes from 'prop-types';

const TimeDisplay = ({ value, label }) => (
  <div className="bg-gray-900 px-4 py-3 rounded-xl min-w-[70px] md:min-w-[90px] text-center">
    <div className="text-3xl md:text-4xl font-mono font-bold text-white">{value}</div>
    <div className="text-xs text-gray-400">{label}</div>
  </div>
);

TimeDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

const ExerciseTimer = () => {
  const { time, start, pause, stop, isRunning } = useStopwatch();
  
  return (
    <div className="bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-xl mt-12 border border-gray-700">
      <h3 className="text-xl font-semibold mb-6 text-center text-green-400">Workout Timer</h3>
      <div className="flex justify-center gap-2 md:gap-4 mb-8">
        <TimeDisplay value={time.hours} label="Hours" />
        <TimeDisplay value={time.minutes} label="Minutes" />
        <TimeDisplay value={time.seconds} label="Seconds" />
      </div>
      
      <div className="flex justify-center gap-4">
        <button 
          onClick={isRunning ? pause : start} 
          className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 text-base font-bold rounded-lg flex items-center gap-2 transition-colors w-1/2 justify-center"
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button 
          onClick={stop} 
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 text-base font-bold rounded-lg flex items-center gap-2 transition-colors w-1/3 justify-center"
          aria-label="Stop timer"
        >
          ⏹ Stop
        </button>
      </div>
    </div>
  );
};

export default ExerciseTimer;
