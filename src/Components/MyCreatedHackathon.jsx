import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyCreatedHackathon = () => {
  const [hackathons, setHackathons] = useState([]);
  const [error, setError] = useState(null);
  const [participantsVisibility, setParticipantsVisibility] = useState({});

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

  return (
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
                onClick={() => toggleParticipants(hackathon._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                {participantsVisibility[hackathon._id] ? 'Hide Participants' : 'Show Participants'}
              </button>

              {/* Show Participants if button is clicked */}
              {participantsVisibility[hackathon._id] && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Participants</h4>
                  <ul className="space-y-2 mt-2">
                    {hackathon.participants && hackathon.participants.length > 0 ? (
                      hackathon.participants.map((participant, index) => (
                        <li key={index} className="text-gray-600">
                          {participant.user.name} ({participant.user.email})
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No participants yet</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">You have not created any hackathons yet.</div>
        )}
      </div>
    </div>
  );
};

export default MyCreatedHackathon;
