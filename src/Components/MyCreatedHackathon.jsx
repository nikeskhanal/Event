import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const MyCreatedHackathon = () => {
  const [hackathons, setHackathons] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyHackathons = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/hackathons/my-posted-hackathons", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setHackathons(response.data.hackathons);
      } catch (error) {
        setError("Error fetching your created hackathons");
      }
    };

    fetchMyHackathons();
  }, []);

  const viewParticipants = (hackathonId) => {
    navigate(`/hackathon/${hackathonId}/participants`);
  };

  const deleteHackathon = async (hackathonId) => {
    if (!window.confirm("Are you sure you want to delete this hackathon?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/hackathons/${hackathonId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setHackathons(hackathons.filter((hackathon) => hackathon._id !== hackathonId));
    } catch (error) {
      setError("Error deleting hackathon");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 p-6">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
            onClick={() => navigate("/recruiter-home")}
          >
            Home
          </button>
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

        <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Created Hackathons</h2>

          {error && <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">{error}</div>}

          {hackathons.length === 0 ? (
            <p className="text-center text-gray-500">You have not created any hackathons yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hackathons.map((hackathon) => (
                <div key={hackathon._id} className="bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-800">{hackathon.title}</h3>
                  <p className="text-gray-600 mt-2">{hackathon.description}</p>
                  <p className="text-gray-500 mt-2">Start Date: {new Date(hackathon.startDate).toLocaleDateString()}</p>
                  <p className="text-gray-500 mt-2">End Date: {new Date(hackathon.endDate).toLocaleDateString()}</p>
                  <p className="text-gray-500 mt-2">Location: {hackathon.location}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => viewParticipants(hackathon._id)}
                      className="px-5 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                      View Participants
                    </button>
                    <button
                      onClick={() => deleteHackathon(hackathon._id)}
                      className="px-5 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCreatedHackathon;
