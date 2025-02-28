import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HackathonParticipantList = () => {
  const { hackathonId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // State to hold the message
  const [messageBoxVisible, setMessageBoxVisible] = useState(null); // State to show/hide the message box

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

  const handleSendMessage = (participantId) => {
    console.log(`Sending message to participant ${participantId}: ${message}`);
    // You can now implement sending the message, e.g., through an API
    setMessage(''); // Reset message after sending
    setMessageBoxVisible(null); // Hide message box
  };

  const handleViewProfile = (participantId) => {
    console.log(`Viewing profile of participant ${participantId}`);
  };

  const toggleMessageBox = (participantId) => {
    setMessageBoxVisible(participantId);
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
                {/* Send Message Button */}
                <button
                  onClick={() => toggleMessageBox(participant._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Send Message
                </button>
                {/* View Profile Button */}
                <button
                  onClick={() => handleViewProfile(participant._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  View Profile
                </button>
              </div>

              {/* Message Box */}
              {messageBoxVisible === participant._id && (
                <div className="mt-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here"
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => handleSendMessage(participant._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Send
                  </button>
                </div>
              )}
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
