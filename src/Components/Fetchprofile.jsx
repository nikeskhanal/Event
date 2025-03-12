import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User, Mail, Briefcase, Code, MapPin, Book } from "lucide-react"; 

const FetchProfile = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID not provided.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const endpoint = `http://localhost:4000/api/profile/${userId}`;
        console.log("Fetching profile from:", endpoint);

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.data.user) throw new Error("User not found");

        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <div className="text-center text-gray-500">Loading profile...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 text-center">Profile Details</h3>

      {/* Profile Image */}
      <img
        src={user.photo ? `http://localhost:4000/uploads/${user.photo}` : '/default-photo.jpg'}
        alt="Profile"
        className="w-36 h-36 rounded-full object-cover border-4 border-indigo-600 mx-auto"
        onError={(e) => (e.target.src = "/default-photo.jpg")}
      />

      <div className="space-y-4 text-gray-700">
        {/* Name */}
        <div className="flex items-center space-x-4">
          <User className="text-indigo-600 w-6 h-6" />
          <p className="font-medium">Name:</p>
          <p className="text-gray-600">{user.name || "No name available"}</p>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <Mail className="text-indigo-600 w-6 h-6" />
          <p className="font-medium">Email:</p>
          <p className="text-gray-600">{user.email || "No email available"}</p>

          <a
              href={`mailto:${user.email}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition"
            >
              <Mail className="w-5 h-5" />
              <span>Send Mail</span>
            </a>
         


        </div>

        
       
         
        

        {/* Bio */}
        <div className="flex items-center space-x-4">
          <Briefcase className="text-indigo-600 w-6 h-6" />
          <p className="font-medium">Bio:</p>
          <p className="text-gray-600">{user.bio?.trim() || "No bio available"}</p>
        </div>

        {/* Skills */}
        <div className="flex items-center space-x-4">
          <Code className="text-indigo-600 w-6 h-6" />
          <p className="font-medium">Skills:</p>
          <p className="text-gray-600">{user.skills?.trim() || "No skills available"}</p>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-4">
          <MapPin className="text-indigo-600 w-6 h-6" />
          <p className="font-medium">Location:</p>
          <p className="text-gray-600">{user.location?.trim() || "No location available"}</p>
        </div>

        {/* Education */}
        <div className="flex items-center space-x-4">
          <Book className="text-indigo-600 w-6 h-6" />
          <p className="font-medium">Education:</p>
          <p className="text-gray-600">{user.education?.trim() || "No education information"}</p>
        </div>

        {/* Job */}
        <div className="flex items-center space-x-4">
          <Briefcase className="text-indigo-600 w-6 h-6" />
          <p className="font-medium">Job:</p>
          <p className="text-gray-600">{user.job?.trim() || "No job information"}</p>
        </div>
      </div>
    </div>
  );
};

export default FetchProfile;
