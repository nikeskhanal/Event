import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const AdminJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/jobs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setJobs(response.data.jobs);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/admin/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setJobs(jobs.filter((job) => job._id !== jobId)); // Remove the deleted job from the UI
      alert("Job deleted successfully!");
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  if (loading) return <p className="text-center">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate("/admin")} // Navigate to /admin
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition mb-4"
      >
        Back to Admin
      </button>

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Job Management</h2>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul className="space-y-6">
          {jobs.map((job) => (
            <li key={job._id} className="border p-4 mb-4 rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold text-gray-700">{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Recruiter:</strong> {job.recruiter?.name} ({job.recruiter?.email})</p>

              <h4 className="text-lg font-medium text-gray-700 mt-4">Applicants:</h4>
              <ul>
                {job.applications.length > 0 ? (
                  job.applications.map((app) => (
                    <li key={app.user._id}>
                      {app.user.name} ({app.user.email})
                    </li>
                  ))
                ) : (
                  <p>No applicants yet</p>
                )}
              </ul>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => deleteJob(job._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete Job
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminJob;
