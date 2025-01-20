import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams

const ApplicantsList = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!jobId) {
        setError('Job ID is missing.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:4000/api/jobs/applicants/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Ensure applicants array exists in the response
        if (response.data && response.data.applicants) {
          setApplicants(response.data.applicants);
        } else {
          setError('No applicants found.');
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch applicants.');
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) {
    return <div>Loading applicants...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applicants found for this job.</p>
      ) : (
        <ul>
          {applicants.map((applicant) => (
            <li key={applicant.user ? applicant.user._id : 'unknown'}>
              {applicant.user ? (
                <>
                  <p><strong>Name:</strong> {applicant.user.name}</p>
                  <p><strong>Email:</strong> {applicant.user.email}</p>
                </>
              ) : (
                <p>Unknown Applicant</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicantsList;
