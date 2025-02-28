import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateHackathon = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hackathonData = { title, description, startDate, endDate, location };

      const response = await axios.post('http://localhost:4000/api/hackathons/create', hackathonData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSuccessMessage('Hackathon created successfully!');  // Set success message

      // Reset form fields
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setLocation('');

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/hackathons');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Error creating hackathon');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create a New Hackathon</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Hackathon Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Hackathon
        </button>
      </form>
    </div>
  );
};

export default CreateHackathon;
