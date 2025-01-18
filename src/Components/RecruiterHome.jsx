import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

const RecruiterHome = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-full max-w-sm p-6 bg-white rounded shadow">
          <div className="relative">
            <button
              aria-expanded={isDropdownOpen}
              aria-controls="dropdown-menu"
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300 transition ease-in-out duration-200"
              onClick={toggleDropdown}
            >
              Create New
            </button>
            {isDropdownOpen && (
              <ul
                id="dropdown-menu"
                className="absolute w-full mt-2 bg-white border rounded shadow z-10"
              >
                <li
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/job')}
                >
                  Jobs
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/quiz')}
                >
                  Quiz
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/internship')}
                >
                  Internship
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/hackathons')}
                >
                  Hackathons
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterHome;
