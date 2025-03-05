import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/jobs/my-posted-jobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch your posted jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchPostedJobs();
  }, []);

  const deleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:4000/api/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(jobs.filter((job) => job._id !== jobId));
        alert("Job deleted successfully.");
      } catch (err) {
        alert("Failed to delete the job. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-700">Loading your posted jobs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (jobs.length === 0) {
    return <div className="text-center text-gray-700">You haven't posted any jobs yet.</div>;
  }

  return (
    <div>
      <Navbar/>
   
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 p-6">
      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition" onClick={() => navigate('/:id/recruiter-home')}>
          Home
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition" onClick={() => navigate('/:id/recruiter-home/my-posted-jobs')}>
          My Jobs
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition" onClick={() => navigate('/my-quizzes')}>
          My Quizzes
        </button>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition" onClick={() => navigate('/my-hackathons')}>
          My Hackathons
        </button>
      </div>

      {/* Job Listings */}
      <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Posted Jobs</h2>

        <ul className="space-y-6">
          {jobs.map((job) => (
            <li key={job._id} className="bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600 mt-2">{job.description}</p>
              <p className="mt-2 text-gray-800"><strong>Company:</strong> {job.company}</p>
              <p className="mt-1 text-gray-800"><strong>Location:</strong> {job.location}</p>
              <p className="mt-1 text-sm text-gray-500"><strong>Posted At:</strong> {new Date(job.postedAt).toLocaleString()}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => deleteJob(job._id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/job/${job._id}/applicants`)}
                  className="bg-green-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-600 transition"
                >
                  View Applicants
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default MyPostedJobs;
