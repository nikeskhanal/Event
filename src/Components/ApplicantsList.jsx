import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SendMessage from './SendMessage';

const ApplicantsList = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notificationStatus, setNotificationStatus] = useState({});

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

  const sendNotification = async (userId, message) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/notifications/send',
        { userId, message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNotificationStatus((prev) => ({ ...prev, [userId]: 'Sent' }));
    } catch (error) {
      console.error('Failed to send notification:', error.response?.data || error.message);
      setNotificationStatus((prev) => ({ ...prev, [userId]: 'Failed' }));
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading applications...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (applications.length === 0) return <div className="text-center text-gray-500">No applicants for this job yet.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Applicants </h2>

      <ul>
        {applications.map((application) => (
          <li
            key={application._id}
            className="mb-6 p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <strong className="text-xl text-gray-800">{application.user.name}</strong>
                <div className="text-gray-600">{application.user.email}</div>
                <div className="text-sm text-gray-500">Applied at: {new Date(application.appliedAt).toLocaleString()}</div>
              </div>
              {/* View Profile Button */}
              <button
                onClick={() => alert(`View profile of ${application.user.name}`)} // Implement navigation or modal as needed
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                View Profile
              </button>
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <SendMessage
                applicantId={application.user._id}
                sendNotification={sendNotification}
              />
              {notificationStatus[application.user._id] && (
                <div className="text-sm text-green-500">
                  {notificationStatus[application.user._id] === 'Sent'
                    ? 'Notification Sent!'
                    : 'Failed to send notification'}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicantsList;
