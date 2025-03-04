import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

import MyPostedJobs from './MyPostedJobs';
import MyPostedQuiz from './MyPostedQuiz';
import MyCreatedHackathon from './MyCreatedHackathon';

const RecruiterHome = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <Navbar />
      
   
      <div className="flex justify-center space-x-4 my-6">
        <button className="px-6 py-2 bg-blue-500 text-white rounded shadow" onClick={() => navigate('/:id/recruiter-home/my-posted-jobs')}>
          My Posted Jobs
        </button>
        <button className="px-6 py-2 bg-green-500 text-white rounded shadow" onClick={() => navigate('/my-quizzes')}>
          My Posted Quiz
        </button>
        <button className="px-6 py-2 bg-purple-500 text-white rounded shadow" onClick={() => navigate('/my-hackathons')}>
          My Created Hackathon
        </button>
      </div>

      <div className="flex justify-center my-4">
  <div className="relative">
  <div className="flex justify-center my-6">
  <button
    aria-expanded={isDropdownOpen}
    aria-controls="dropdown-menu"
    className="px-8 py-3 text-lg bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
    onClick={toggleDropdown}
  >
    + Create New
  </button>
</div>

{isDropdownOpen && (
  <div className="flex justify-center">
    <ul className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
        onClick={() => navigate('/jobform')}
      >
        Jobs
      </li>
      <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
        onClick={() => navigate('/quiz')}
      >
        Quiz
      </li>
      <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
        onClick={() => navigate('/create-hackathon')}
      >
        Hackathons
      </li>
    </ul>
  </div>
)}
{/* 
    <MyPostedJobs/>
    <MyPostedQuiz/>
    <MyCreatedHackathon/> */}
  </div>
</div>
</div>
  );
};

export default RecruiterHome;
