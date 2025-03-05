import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Edit, User, MapPin, Briefcase, Book, Code, Info } from 'lucide-react';
import UserNav from './UserNav';
const UserProfile = () => {
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
  
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user._id;

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
    <div>
      <UserNav/>
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">User Profile</h2>
      <div className="flex flex-col items-center space-y-6">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={user.photo ? `http://localhost:4000/uploads/${user.photo}` : '/default-photo.jpg'}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-600"
          />
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email || ''}
                disabled
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          
            <div>
              <label className="block text-sm font-medium text-gray-700">Job</label>
              <input
                type="text"
                name="job"
                value={formData.job || ''}
                onChange={handleInputChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
      
<div className="space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto">
  <div className="text-center">
    <h3 className="text-3xl font-bold text-gray-800">Profile Details</h3>
  </div>

  <div className="space-y-6 text-gray-700">
    {/* Name */}
    <div className="flex items-center space-x-4">
      <User className="text-indigo-600 w-6 h-6" />
      <div className="flex justify-between w-full">
        <p className="font-medium">Name:</p>
        <p className="text-gray-600">{user.name}</p>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-center space-x-4">
      <Info className="text-indigo-600 w-6 h-6" />
      <div className="flex justify-between w-full">
        <p className="font-medium">Email:</p>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>

    {/* Bio - Larger Box with Better Readability */}
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        <Briefcase className="text-indigo-600 w-6 h-6" />
        <p className="font-medium">Bio:</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg text-gray-700 text-sm leading-relaxed">
        {user.bio || "No bio available"}
      </div>
    </div>

    {/* Skills */}
    <div className="flex items-center space-x-4">
      <Code className="text-indigo-600 w-6 h-6" />
      <div className="flex justify-between w-full">
        <p className="font-medium">Skills:</p>
        <p className="text-gray-600">{user.skills}</p>
      </div>
    </div>

    {/* Location */}
    <div className="flex items-center space-x-4">
      <MapPin className="text-indigo-600 w-6 h-6" />
      <div className="flex justify-between w-full">
        <p className="font-medium">Location:</p>
        <p className="text-gray-600">{user.location}</p>
      </div>
    </div>

    {/* Education */}
    <div className="flex items-center space-x-4">
      <Book className="text-indigo-600 w-6 h-6" />
      <div className="flex justify-between w-full">
        <p className="font-medium">Education:</p>
        <p className="text-gray-600">{user.education}</p>
      </div>
    </div>

    {/* Job */}
    <div className="flex items-center space-x-4">
      <Briefcase className="text-indigo-600 w-6 h-6" />
      <div className="flex justify-between w-full">
        <p className="font-medium">Job:</p>
        <p className="text-gray-600">{user.job}</p>
      </div>
    </div>
  </div>

  {/* Edit Button */}
  <div className="text-center mt-8">
    <button
      onClick={() => setIsEditing(true)}
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
    >
      <Edit className="w-5 h-5" />
      <span>Edit Profile</span>
    </button>
  </div>
</div>
        )}
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
