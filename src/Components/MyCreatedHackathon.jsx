import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const MyCreatedHackathon = () => {
  const [hackathons, setHackathons] = useState([]);
  const [error, setError] = useState(null);
  const [participantsVisibility, setParticipantsVisibility] = useState({});
  const navigate = useNavigate();

  // Fetch the hackathons created by the logged-in user
  useEffect(() => {
    const fetchMyHackathons = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/hackathons/my-posted-hackathons', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHackathons(response.data.hackathons);
      } catch (error) {
        setError('Error fetching your created hackathons');
      }
    };

    fetchMyHackathons();
  }, []);

  // Toggle visibility of participants
  const toggleParticipants = (hackathonId) => {
    setParticipantsVisibility((prevState) => ({
      ...prevState,
      [hackathonId]: !prevState[hackathonId],
    }));
  };

  // Navigate to HackathonParticipantList
  const viewParticipants = (hackathonId) => {
    navigate(`/hackathon/${hackathonId}/participants`);
  };

  return (
  <div >

   
<div className="flex justify-center space-x-4 my-6">
<button
          className="px-6 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
          onClick={() => navigate("/:id/recruiter-home")}
        >
          Back to Home Page
        </button>
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
  
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">My Created Hackathons</h2>

      {/* Display error message */}
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">{error}</div>}

      {/* Display all the created hackathons */}
      <div className="space-y-4">
        {hackathons.length > 0 ? (
          hackathons.map((hackathon) => (
            <div key={hackathon._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{hackathon.title}</h3>
              <p className="text-gray-600">{hackathon.description}</p>
              <p className="text-gray-500">Start Date: {new Date(hackathon.startDate).toLocaleDateString()}</p>
              <p className="text-gray-500">End Date: {new Date(hackathon.endDate).toLocaleDateString()}</p>
              <p className="text-gray-500">Location: {hackathon.location}</p>

              {/* Participants Button */}
              <button
                onClick={() => viewParticipants(hackathon._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                View Participants
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">You have not created any hackathons yet.</div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MyCreatedHackathon;
