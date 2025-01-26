import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch jobs from the backend API
  useEffect(() => {
  const fetchJobs = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/jobs');
    if (response.data.jobs) {
      setJobs(response.data.jobs); // Assuming the response contains a jobs array
    } else {
      setError('No jobs available.');
    }
    setLoading(false);
  } catch (err) {
    // Check if the error is related to the network
    if (!err.response) {
      setError('Network Error. Please check your connection.');
    } else {
      setError('Failed to load jobs. Please try again later.');
    }
    setLoading(false);
  }
};

    
    fetchJobs();
  }, []);

  // Handle job application
  const handleApply = async (jobId) => {
    try {
      setError('');
      setSuccess('');

      // Check if token exists in localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to apply for jobs.');
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/api/jobs/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      setSuccess(response.data.message);
      setAppliedJobs((prev) => [...prev, jobId]); // Track applied jobs
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply for the job. Please try again later.');
    }
  };

  // Show loading state
  if (loading) {
    return <div className="text-center text-gray-500">Loading jobs...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
      
      {/* Error and Success Messages */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      
      {/* Display Job List */}
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-700">{job.description}</p>
            <p className="mt-2">
              <strong>Company:</strong> {job.company}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <button
              onClick={() => handleApply(job._id)}
              className={`mt-4 px-4 py-2 text-white rounded ${appliedJobs.includes(job._id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              disabled={appliedJobs.includes(job._id)}
            >
              {appliedJobs.includes(job._id) ? 'Applied' : 'Apply'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
