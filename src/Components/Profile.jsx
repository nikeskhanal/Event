import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    skills: '',
    location: '',
    photo: '',
    education: '',
    job: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch user data when the component mounts
    axios
      .get('http://localhost:4000/api/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setFormData(response.data.user);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user._id; // Assuming `user._id` is the unique identifier for the user

    // Create a FormData object for the profile update
    const data = new FormData();
    data.append('name', formData.name);
    data.append('bio', formData.bio);
    data.append('skills', formData.skills);
    data.append('location', formData.location);
    data.append('education', formData.education);
    data.append('job', formData.job);

    if (formData.photo instanceof File) {
      data.append('photo', formData.photo);
    }

    // API request to update the profile
    axios
      .put(`http://localhost:4000/api/updateUser/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setUser(response.data.updatedUser);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">User Profile</h2>
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <img
          src={user.photo ? 
          
            <img src={`http://localhost:5000/${user.photo}`} alt="User Profile" />

          
          
           : '/default-photo.jpg'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email || ''}
                disabled
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Job</label>
              <input
                type="text"
                name="job"
                value={formData.job || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold">Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Bio: {user.bio}</p>
            <p>Skills: {user.skills}</p>
            <p>Location: {user.location}</p>
            <p>Education: {user.education}</p>
            <p>Job: {user.job}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
