import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, ArrowLeft } from 'lucide-react';

const ApplicantsList = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) {
        setError('Invalid job ID');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:4000/api/jobs/${jobId}/applications`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setApplications(response.data.applications);
      } catch (err) {
        setError('Failed to load applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [jobId]);

  if (loading) return <div className="text-center text-gray-500">Loading applications...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (applications.length === 0) return <div className="text-center text-gray-500">No applicants for this job yet.</div>;

  return (
    <div className="bg-blue-400">
      <div className="max-w-4xl mx-auto p-6 bg-blue-400 shadow-lg rounded-xl">
        <button
          onClick={() => navigate(`/my-posted-jobs`)}
          className="flex items-center mb-4 text-white bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </button>
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Applicants</h2>
        <ul>
          {applications.map((application) => (
            <li
              key={application._id}
              className="mb-6 p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <User className="text-blue-500" size={20} />
                    <strong className="text-xl text-gray-800">{application.user.name}</strong>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <Mail size={18} className="text-gray-500" />
                    <span>{application.user.email}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Applied at: {new Date(application.appliedAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/profile/${application.user._id}`)}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  View Profile
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicantsList;
