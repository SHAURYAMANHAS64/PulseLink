import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const WeeklyTracker = () => {
  // ✅ Get initial data
  const getInitialDays = () => {
    const stored = localStorage.getItem("weeklyTracker");
    if (stored) return JSON.parse(stored);
    return [
      { name: "Monday", completed: false },
      { name: "Tuesday", completed: false },
      { name: "Wednesday", completed: false },
      { name: "Thursday", completed: false },
      { name: "Friday", completed: false },
      { name: "Saturday", completed: false },
      { name: "Sunday", completed: false },
    ];
  };

  const [days, setDays] = useState(getInitialDays);
  const [quote, setQuote] = useState("");

  // ✅ Save data in localStorage
  useEffect(() => {
    localStorage.setItem("weeklyTracker", JSON.stringify(days));
  }, [days]);

  // ✅ Confetti when all days are completed
  useEffect(() => {
    const allCompleted = days.every((d) => d.completed);
    if (allCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setQuote("🔥 Amazing! You’ve completed your whole week!");
    } else if (days.filter((d) => d.completed).length >= 4) {
      setQuote("👏 Great job! Keep that streak going!");
    } else if (days.filter((d) => d.completed).length > 0) {
      setQuote("💪 You’re on your way — consistency is key!");
    } else {
        
      setQuote("Start strong this week! 💫");
    }
  }, [days]);

  // ✅ Toggle completion
  const toggleDay = (indexToToggle) => {
    setDays((prev) =>
      prev.map((day, index) =>
        index === indexToToggle
          ? { ...day, completed: !day.completed }
          : day
      )
    );
  };

  // ✅ Reset all days
  const resetWeek = () => {
    const resetDays = days.map((d) => ({ ...d, completed: false }));
    setDays(resetDays);
    localStorage.setItem("weeklyTracker", JSON.stringify(resetDays));
  };

  const completedDays = days.filter((d) => d.completed).length;
  const progressPercentage = (completedDays / days.length) * 100;

  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Weekly Tracker</h2>
          <button
            onClick={resetWeek}
            className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition"
          >
            Reset Week
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm font-semibold text-gray-200">
              {completedDays}/{days.length} days
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Motivation Message */}
        <p className="text-center text-gray-300 italic mb-6 transition-all duration-300">
          {quote}
        </p>

        {/* Day List */}
        <div className="space-y-3">
          {days.map((day, index) => (
            <div
              key={day.name}
              onClick={() => toggleDay(index)}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border
                ${
                  day.completed
                    ? "bg-green-500/20 border-green-500 hover:bg-green-500/30"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    day.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-500"
                  }`}
                >
                  {day.completed && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-lg font-medium ${
                    day.completed ? "text-white" : "text-gray-300"
                  }`}
                >
                  {day.name}
                </span>
              </div>

              {day.completed && (
                <span className="text-sm text-green-400 font-semibold">
                  Done
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          {completedDays === 0
            ? "Let’s make this week productive! 🌟"
            : `${days.length - completedDays} day${
                days.length - completedDays === 1 ? "" : "s"
              } left this week.`}
        </div>
      </div>
    </section>
  );
};

export default WeeklyTracker;
