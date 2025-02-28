import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNav from './UserNav';

const UserHome = () => {
  const navigate = useNavigate();

  // Handlers for button clicks
  const handleQuizClick = () => {
    navigate('/play-quiz');
  };

  const handleHackathonClick = () => {
    navigate('/hackathons');
  };

  const handleJobClick = () => {
    navigate('/joblist');
  };

  return (
    <div>
      <UserNav/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome to User Home</h1>
      <div className="flex flex-col gap-4">
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          onClick={handleQuizClick}
        >
          Browse for Quiz
        </button>
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          onClick={handleHackathonClick}
        >
          Browse for Hackathon
        </button>
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          onClick={handleJobClick}
        >
          Browse for Job
        </button>
      </div>
    </div>
    </div>
  );
};

export default UserHome;
