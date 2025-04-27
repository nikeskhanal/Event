import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateHackathon = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !startDate || !endDate || !location) {
      setError("Please fill in all fields");
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/api/hackathons/create",
        { title, description, startDate, endDate, location },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Hackathon created successfully!");
      setError("");
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setLocation("");

      setTimeout(() => {
        navigate("/recruiter-home");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || "Error creating hackathon");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create a New Hackathon
        </h2>

       
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md"
        >
          Back
        </button>

        {/* Success & Error Messages */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Hackathon Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-gray-700 font-medium">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-gray-700 font-medium">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 font-medium">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white font-bold transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Hackathon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHackathon;
