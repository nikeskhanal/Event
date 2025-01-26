import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch posted jobs
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

  // Delete job
  const deleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:4000/api/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(jobs.filter((job) => job._id !== jobId)); // Remove deleted job from the list
        alert("Job deleted successfully.");
      } catch (err) {
        alert("Failed to delete the job. Please try again.");
      }
    }
  };

  // Navigate to applicants page
  const viewApplicants = (jobId) => {
    navigate(`/applicants/${jobId}`);
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">My Posted Jobs</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job._id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <p className="mb-2">
              <strong>Company:</strong> {job.company}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="mb-4 text-sm text-gray-500">
              <strong>Posted At:</strong> {new Date(job.postedAt).toLocaleString()}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => deleteJob(job._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/update-job/${job._id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
  onClick={() => (window.location.href = `/job/${job._id}/applicants`)}
  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
>
  View Applicants
</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPostedJobs;
