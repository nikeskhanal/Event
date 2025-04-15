import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircle, CheckCircle } from 'lucide-react'; // Import icons

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/jobs');
        if (response.data.jobs) {
          setJobs(response.data.jobs);
        } else {
          setError('No jobs available.');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        setLoading(false);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:4000/api/jobs/applied', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAppliedJobs(response.data.appliedJobs.map(job => job._id));
      } catch (err) {
        console.error('Error fetching applied jobs:', err);
      }
    };

    fetchJobs();
    fetchAppliedJobs();
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
      setError('');
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      alert(success);
      setSuccess('');
    }
  }, [success]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading jobs...</div>;
  }

  const handleApply = async (jobId) => {
    try {
      setError('');
      setSuccess('');

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

      if (response.data && response.data.message) {
        setSuccess(response.data.message);
        setAppliedJobs((prev) => [...prev, jobId]);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || err.response.data.message || 'Failed to apply for the job. Please try again later.');
      } else {
        setError('Failed to apply for the job. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center px-6 py-10">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-8">
        Available Jobs
      </h1>

      {/* Glassmorphism Container */}
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-3xl text-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md mb-6"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={() => navigate("/uploadcv")}
          className="flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md mb-6"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          uploadcv
        </button>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-semibold text-black drop-shadow-sm">{job.title}</h3>
              <p className="text-gray-800 mt-2 text-lg">{job.description}</p>
              <p className="text-gray-900 mt-1 font-medium">
                <strong>Company:</strong> {job.company}
              </p>
              <p className="text-gray-900">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-900">
                <strong>Salary:</strong> {job.salary ? `$${job.salary}` : 'Not disclosed'}
              </p>
              <button
                onClick={() => handleApply(job._id)}
                className={`mt-4 flex items-center justify-center px-6 py-2 rounded-lg text-white text-lg font-semibold ${
                  appliedJobs.includes(job._id)
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={appliedJobs.includes(job._id)}
              >
                {appliedJobs.includes(job._id) ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Applied
                  </>
                ) : (
                  'Apply'
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
