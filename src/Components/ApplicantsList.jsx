import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, ArrowLeft } from "lucide-react";

const ApplicantsList = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) {
        setError("Invalid job ID");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:4000/api/jobs/${jobId}/applications`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setApplications(response.data.applications);
      } catch (err) {
        setError("Failed to load applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [jobId]);

  const handleViewCV = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/viewcv/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob", // To handle the binary data
        }
      );

      if (response.status === 200) {
        const fileURL = URL.createObjectURL(response.data);
        window.open(fileURL, "_blank"); // Open in a new tab
      } else {
        console.error("Failed to view CV");
      }
    } catch (err) {
      console.error("Error viewing CV:", err);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-500">Loading applications...</div>
    );
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (applications.length === 0)
    return (
      <div className="text-center text-gray-500">
        No applicants for this job yet.
      </div>
    );
    const handleSendNotification = async (userId, message) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/notifications",
          {
            userId, // ✅ Match the backend
            message,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
    
        if (response.status === 200) {
          alert("Notification sent successfully!");
        } else {
          alert("Failed to send notification.");
        }
      } catch (err) {
        console.error("Error sending notification:", err);
        alert("Error sending notification.");
      }
    };
    

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
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Applicants
        </h2>
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
                    <strong className="text-xl text-gray-800">
                      {application.user.name}
                    </strong>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <Mail size={18} className="text-gray-500" />
                    <span>{application.user.email}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Applied at:{" "}
                    {new Date(application.appliedAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/profile/${application.user._id}`)}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleViewCV(application.user._id)}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    View CV
                  </button>
                  <button
                    onClick={() =>
                      handleSendNotification(
                        application.user._id,
                        "🎉 Congratulations! You’ve been selected for the next round."
                      )
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleSendNotification(
                        application.user._id,
                        "🙏 Thank you for applying. Unfortunately, you were not selected."
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicantsList;
