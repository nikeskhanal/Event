
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FetchProfile = () => {
  const { userId } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const endpoint = userId ? `/api/profile/${userId}` : "/api/profile"; // Dynamically fetch correct profile
        console.log("Fetching profile from:", endpoint); // Debugging line
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("API Response:", response.data); // Debugging line
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio}</p>
          <p>Location: {user.location}</p>
          <p>Education: {user.education}</p>
        </div>
      )}
    </div>
  );
};

export default FetchProfile;
