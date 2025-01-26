import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SendMessage from './SendMessage'; // Import the SendMessage component

const ApplicantsList = () => {
  const { jobId } = useParams(); // Extract jobId from the URL
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notificationStatus, setNotificationStatus] = useState({});

  useEffect(() => {
    if (!jobId) {
      setError('Invalid job ID');
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/jobs/${jobId}/applications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setApplications(response.data.applications);
        setLoading(false);
      } catch (err) {
        setError('Failed to load applications. Please try again later.');
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
      setNotificationStatus((prev) => ({ ...prev, [userId]: 'Failed' }));
    }
  };

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (applications.length === 0) {
    return <div>No applicants for this job yet.</div>;
  }

  return (
    <div>
      <h2>Applicants for Job {jobId}</h2>
      <ul>
        {applications.map((application) => (
          <li key={application._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <div>
              <strong>{application.user.name}</strong> ({application.user.email})
            </div>
            <div>Applied at: {new Date(application.appliedAt).toLocaleString()}</div>

            <div className="mt-2">
              {/* Send Message Button */}
              <SendMessage
                jobId={jobId}
                applicantId={application.user._id}
                sendNotification={sendNotification} // Pass sendNotification function as prop
              />
              {/* Display notification status */}
              {notificationStatus[application.user._id] && (
                <div className="mt-2 text-sm text-green-500">
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
