import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const JobForm = () => {
  const navigate = useNavigate();  // Initialize useNavigate
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !company || !location || !salary) {
      setError("Please fill in all fields");
      setSuccess("");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const API_URL = "http://localhost:4000";

      const response = await axios.post(
        `${API_URL}/api/jobs/create`,
        { title, description, company, location, salary },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Job posted successfully!");
      setError("");
      setTitle("");
      setDescription("");
      setCompany("");
      setSalary("");
      setLocation("");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token");
      } else {
        setError(err.response?.data?.error || "Failed to post job. Please try again.");
      }
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 p-6 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Post a New Job</h2>

        {/* Back Button */}
        <button
          onClick={() => navigate("/recruiter-home")}
          className="mb-6 flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md"
        >
          Back
        </button>

        {/* Success and Error Messages */}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">Job Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-gray-700 font-medium">Company</label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-gray-700 font-medium">Location</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="salary" className="block text-gray-700 font-medium">Salary</label>
            <input
              id="salary"
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full py-2 rounded text-white font-bold transition duration-200 ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
