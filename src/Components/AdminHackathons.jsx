import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const AdminHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/hackathons", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHackathons(response.data.hackathons);
    } catch (err) {
      setError("Failed to fetch hackathons");
    } finally {
      setLoading(false);
    }
  };

  const deleteHackathon = async (hackathonId) => {
    if (!window.confirm("Are you sure you want to delete this hackathon?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/admin/hackathons/${hackathonId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHackathons(hackathons.filter((hackathon) => hackathon._id !== hackathonId));
      alert("Hackathon deleted successfully!");
    } catch (err) {
      alert("Failed to delete hackathon");
    }
  };

  if (loading) return <p className="text-center">Loading hackathons...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate("/admin")} // Navigate to /admin
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition mb-4"
      >
        Back to Admin
      </button>

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Hackathon Management</h2>
      {hackathons.length === 0 ? (
        <p>No hackathons available</p>
      ) : (
        <ul className="space-y-6">
          {hackathons.map((hackathon) => (
            <li key={hackathon._id} className="border p-4 mb-4 rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold text-gray-700">{hackathon.title}</h3>
              <p><strong>Description:</strong> {hackathon.description}</p>
              <p><strong>Start Date:</strong> {new Date(hackathon.startDate).toDateString()}</p>
              <p><strong>End Date:</strong> {new Date(hackathon.endDate).toDateString()}</p>
              <p><strong>Location:</strong> {hackathon.location}</p>
              <p><strong>Organizer:</strong> {hackathon.organizer?.name} ({hackathon.organizer?.email})</p>

              <h4 className="text-lg font-medium text-gray-700 mt-4">Participants:</h4>
              <ul>
                {hackathon.participants.length > 0 ? (
                  hackathon.participants.map((participant) => (
                    <li key={participant.user._id}>
                      {participant.user.name} ({participant.user.email})
                    </li>
                  ))
                ) : (
                  <p>No participants yet</p>
                )}
              </ul>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => deleteHackathon(hackathon._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete Hackathon
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminHackathons;
