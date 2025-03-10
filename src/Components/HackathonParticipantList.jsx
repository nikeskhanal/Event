import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const HackathonParticipantList = () => {
  const { hackathonId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState(null);

  // Fetch participants for the specific hackathon
  useEffect(() => {
    const fetchParticipants = async () => {
      if (!hackathonId) {
        setError('Hackathon ID is missing');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/hackathons/${hackathonId}/participants`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setParticipants(response.data.participants);
      } catch (error) {
        setError('Error fetching participants');
      }
    };

    fetchParticipants();
  }, [hackathonId]);

  const handleViewProfile = (participantId) => {
    navigate(`/profile/${participantId}`); // Navigate to the profile page
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Hackathon Participants</h2>

      {error && <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">{error}</div>}

      <div className="space-y-4">
        {participants.length > 0 ? (
          participants.map((participant) => (
            <div key={participant._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{participant.user.name}</h3>
              <p className="text-gray-600">{participant.user.email}</p>

              <div className="mt-4 space-x-4">
                {/* View Profile Button */}
                <button
                  onClick={() => handleViewProfile(participant.user._id)} // Handle profile view navigation
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No participants yet.</div>
        )}
      </div>
    </div>
  );
};

export default HackathonParticipantList;
