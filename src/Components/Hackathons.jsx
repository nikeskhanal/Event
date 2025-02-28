import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch all hackathons from the backend
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/hackathons', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHackathons(response.data.hackathons);
      } catch (error) {
        setError('Error fetching hackathons');
      }
    };

    fetchHackathons();
  }, []);

  // Handle applying for a hackathon
  const handleApply = async (hackathonId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/hackathons/apply/${hackathonId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage('Application successful!');
    } catch (error) {
      setError('Error applying for hackathon');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">All Hackathons</h2>

      {/* Display success or error messages */}
      {message && <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">{message}</div>}
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">{error}</div>}

      {/* Display all hackathons */}
      <div className="space-y-4">
        {hackathons.length > 0 ? (
          hackathons.map((hackathon) => (
            <div key={hackathon._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{hackathon.title}</h3>
              <p className="text-gray-600">{hackathon.description}</p>
              <p className="text-gray-500">Start Date: {new Date(hackathon.startDate).toLocaleDateString()}</p>
              <p className="text-gray-500">End Date: {new Date(hackathon.endDate).toLocaleDateString()}</p>
              <p className="text-gray-500">Location: {hackathon.location}</p>

              {/* Apply Button */}
              <button
                onClick={() => handleApply(hackathon._id)}
                className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  );
};

export default Hackathons;
