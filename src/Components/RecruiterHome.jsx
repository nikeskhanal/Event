import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const RecruiterHome = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 p-6">
    

      {/* Navigation buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => navigate("/my-posted-jobs")}
        >
          My Jobs
        </button>
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => navigate("/my-quizzes")}
        >
          My Quizzes
        </button>
        <button
          className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
          onClick={() => navigate("/my-hackathons")}
        >
          My Hackathon
        </button>
      </div>

      {/* Create New Dropdown */}
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
        </div>
      </div>
      <div className="flex justify-center space-x-6 mb-12">
  <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
    <h3 className="text-xl font-semibold text-gray-700">Manage Your Jobs</h3>
    <p className="text-gray-600 mt-2">Easily create, edit, and track your job postings.</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
    <h3 className="text-xl font-semibold text-gray-700">Host Quizzes</h3>
    <p className="text-gray-600 mt-2">Engage with candidates by creating challenging quizzes.</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
    <h3 className="text-xl font-semibold text-gray-700">Organize Hackathons</h3>
    <p className="text-gray-600 mt-2">Create hackathons and find top talent.</p>
  </div>
</div>

      </div>

   
    </div>
  );
};

export default RecruiterHome;
