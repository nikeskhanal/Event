import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      await axios.delete(`http://localhost:4000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setJobs(jobs.filter((job) => job._id !== jobId)); // Remove the deleted job from the UI
      alert("Job deleted successfully!");
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Admin Job Management</h2>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Recruiter:</strong> {job.recruiter?.name} ({job.recruiter?.email})</p>

              <h4>Applicants:</h4>
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

              <button onClick={() => deleteJob(job._id)} style={{ background: "red", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer" }}>
                Delete Job
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminJob;
