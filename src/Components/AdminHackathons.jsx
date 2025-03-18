import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      await axios.delete(`http://localhost:4000/api/hackathons/${hackathonId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHackathons(hackathons.filter((hackathon) => hackathon._id !== hackathonId));
      alert("Hackathon deleted successfully!");
    } catch (err) {
      alert("Failed to delete hackathon");
    }
  };

  if (loading) return <p>Loading hackathons...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Admin Hackathon Management</h2>
      {hackathons.length === 0 ? (
        <p>No hackathons available</p>
      ) : (
        <ul>
          {hackathons.map((hackathon) => (
            <li key={hackathon._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
              <h3>{hackathon.title}</h3>
              <p><strong>Description:</strong> {hackathon.description}</p>
              <p><strong>Start Date:</strong> {new Date(hackathon.startDate).toDateString()}</p>
              <p><strong>End Date:</strong> {new Date(hackathon.endDate).toDateString()}</p>
              <p><strong>Location:</strong> {hackathon.location}</p>
              <p><strong>Organizer:</strong> {hackathon.organizer?.name} ({hackathon.organizer?.email})</p>

              <h4>Participants:</h4>
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

              <button onClick={() => deleteHackathon(hackathon._id)} style={{ background: "red", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer" }}>
                Delete Hackathon
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminHackathons;
