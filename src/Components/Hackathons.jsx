import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircle, CheckCircle } from 'lucide-react';

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/hackathons', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setHackathons(response.data.hackathons);
      } catch (error) {
        setError('Error fetching hackathons');
      }
    };

    fetchHackathons();
  }, []);

  const handleApply = async (hackathonId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/hackathons/apply/${hackathonId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setMessage('Application successful!');
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error applying for hackathon';
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center px-6 py-10">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-8">
        Available Hackathons
      </h1>

      {/* Glassmorphism Container */}
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-3xl text-center">
        {/* Back Button */}
        <button
          onClick={() => navigate('/user-home')}
          className="flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md mb-6"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Back
        </button>

        {/* Success/Error Messages */}
        {message && <div className="bg-green-500 text-white p-3 rounded-lg mb-4">{message}</div>}
        {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>}

        {/* Hackathon Listings */}
        <div className="space-y-6">
          {hackathons.length > 0 ? (
            hackathons.map((hackathon) => (
              <div key={hackathon._id} className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-semibold text-black drop-shadow-sm">{hackathon.title}</h3>
                <p className="text-gray-800 mt-2 text-lg">{hackathon.description}</p>
                <p className="text-gray-900 mt-1 font-medium">
                  <strong>Start:</strong> {new Date(hackathon.startDate).toLocaleDateString()}
                </p>
                <p className="text-gray-900">
                  <strong>End:</strong> {new Date(hackathon.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-900">
                  <strong>Location:</strong> {hackathon.location}
                </p>

                {/* Apply Button */}
                <button
                  onClick={() => handleApply(hackathon._id)}
                  className="mt-4 flex items-center justify-center px-6 py-2 rounded-lg text-white text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105"
                >
                  Apply
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No hackathons available at the moment.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hackathons;
