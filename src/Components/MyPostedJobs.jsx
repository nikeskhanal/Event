import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div
     
    >
      <div className="flex justify-center space-x-4 my-6">
        <button className="px-6 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600" onClick={() => navigate('/:id/recruiter-home')}>
          Back to Home Page
        </button>
        <button className="px-6 py-2 bg-blue-500 text-white rounded shadow" onClick={() => navigate('/:id/recruiter-home/my-posted-jobs')}>
          My Posted Jobs
        </button>
        <button className="px-6 py-2 bg-green-500 text-white rounded shadow" onClick={() => navigate('/my-quizzes')}>
          My Posted Quiz
        </button>
        <button className="px-6 py-2 bg-purple-500 text-white rounded shadow" onClick={() => navigate('/my-hackathons')}>
          My Created Hackathon
        </button>
      </div>
      <div className="container mx-auto p-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Posted Jobs</h2>
        <div className="w-full max-w-4xl">
          <ul className="space-y-6">
            {jobs.map((job) => (
              <li key={job._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{job.title}</h3>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <p className="mb-2 text-gray-800"><strong>Company:</strong> {job.company}</p>
                <p className="mb-2 text-gray-800"><strong>Location:</strong> {job.location}</p>
                <p className="mb-4 text-sm text-gray-500"><strong>Posted At:</strong> {new Date(job.postedAt).toLocaleString()}</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/update-job/${job._id}`)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => navigate(`/job/${job._id}/applicants`)}
                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
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
