import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Trash, Eye } from "lucide-react"; // Import Lucide icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get("http://localhost:4000/api/getUser", {
        headers: {
          Authorization: `Bearer ${token}` // Send token in request
        }
      });

      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  const handleViewProfile = (user) => {
    if (selectedUser && selectedUser._id === user._id) {
      setSelectedUser(null); // Close profile if clicked again
    } else {
      setSelectedUser(user); // Set profile of the selected user
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(`http://localhost:4000/api/deleteUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the header
        }
      });

      // Update the state by removing the user from the list
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
    }
  };

  // Button handlers for each section
  const handleViewJobs = () => {
    console.log("Viewing all jobs");
  };

  const handleViewQuizzes = () => {
    console.log("Viewing all quizzes");
  };

  const handleViewHackathons = () => {
    console.log("Viewing all hackathons");
  };

  // Navigate back to recruiter-home
  const handleGoBack = () => {
    navigate("/recruiter-home");
  };

  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>

        {/* Back Button */}
        <button 
          onClick={handleGoBack}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-gray-700 transition duration-200"
        >
          Back to Recruiter Home
        </button>

        {/* Buttons to view jobs, quizzes, and hackathons */}
        <div className="mb-6">
          <button
          
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200"
            onClick={() => navigate("/admin-jobs")}>
            <span className="mr-2"><Eye size={20} /></span> View All Jobs
          </button>
          <button
           
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 ml-4"
            onClick={() => navigate("/admin-quiz")}
          >
            <span className="mr-2"><Eye size={20} /></span> View All Quizzes
          </button>
          <button
           
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-200 ml-4"
            onClick={() => navigate("/admin-hackathons")}>
            <span className="mr-2"><Eye size={20} /></span> View All Hackathons
          </button>
        </div>

        <table className="w-full border border-gray-300 rounded-lg bg-white shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <React.Fragment key={user._id}>
                <tr className="border-b hover:bg-gray-100">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <button 
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 mr-3"
                      onClick={() => handleViewProfile(user)}
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>

                {/* Render profile under the user row with smooth transition */}
                {selectedUser && selectedUser._id === user._id && (
                  <tr className="bg-gray-50">
                    <td colSpan="4" className="p-4">
                      <div className="p-4 border rounded-lg shadow-xl bg-white transition-all duration-500 ease-in-out transform opacity-100">
                        <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
                        {selectedUser.photo && (
                          <div className="mb-4">
                            <img
                              src={selectedUser.photo ? `http://localhost:4000/uploads/${selectedUser.photo}` : '/default-photo.jpg'}
                              alt={`${selectedUser.name}'s profile`}
                              className="w-32 h-32 object-cover rounded-full border"
                            />
                          </div>
                        )}
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        <p><strong>Bio:</strong> {selectedUser.bio || "No bio available"}</p>
                        <p><strong>Skills:</strong> {selectedUser.skills || "No skills listed"}</p>
                        <p><strong>Location:</strong> {selectedUser.location || "No location provided"}</p>
                        <p><strong>Education:</strong> {selectedUser.education || "No education provided"}</p>
                        <p><strong>Job:</strong> {selectedUser.job || "No job information provided"}</p>
                        <button 
                          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                          onClick={() => setSelectedUser(null)}
                        >
                          Close
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
