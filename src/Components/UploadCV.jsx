import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadCV = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      setMessage("Only PDF, DOC, or DOCX files are allowed!");
      setFile(null);
      return;
    }

    setMessage("");
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Unauthorized: Please log in again.");
        return;
      }

      const response = await axios.post("http://localhost:4000/uploadcv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error uploading CV.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-4 flex items-center gap-1"
        >
          ⬅ Back
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Upload Your CV
        </h2>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload CV"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default UploadCV;
