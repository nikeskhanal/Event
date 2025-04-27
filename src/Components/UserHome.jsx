import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Briefcase, Code } from 'lucide-react'; // Importing icons
import UserNav from './UserNav';

const UserHome = () => {
  const navigate = useNavigate();

  // Handlers for button clicks
  const handleQuizClick = () => navigate('/play-quiz');
  const handleHackathonClick = () => navigate('/hackathons');
  const handleJobClick = () => navigate('/joblist');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex flex-col">
      <UserNav />
      <div className="flex flex-col items-center justify-center flex-grow px-6">
        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
          Welcome to User Home
        </h1>

        {/* Glassmorphism Card */}
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="flex flex-col gap-6">
            <button
              className="flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 shadow-md"
              onClick={handleQuizClick}
            >
              <Play className="w-5 h-5" />
              Browse for Quiz
            </button>
            <button
              className="flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition transform hover:scale-105 shadow-md"
              onClick={handleHackathonClick}
            >
              <Code className="w-5 h-5" />
              Browse for Hackathon
            </button>
            <button
              className="flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition transform hover:scale-105 shadow-md"
              onClick={handleJobClick}
            >
              <Briefcase className="w-5 h-5" />
              Browse for Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
