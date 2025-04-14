import { useState } from "react";
import axios from "axios";

const UploadCV = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setMessage("Only PDF, DOC, or DOCX files are allowed!");
        setFile(null);
        return;
      }

      setMessage("");
      setFile(selectedFile);
    }
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
  
      const response = await axios.post(
        "http://localhost:4000/uploadcv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error uploading CV.");
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-3">Upload Your CV</h2>
      
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="border p-2 w-full mb-3"
      />
      
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload CV"}
      </button>

      {message && <p className="mt-3 text-red-500">{message}</p>}
    </div>
  );
};

export default UploadCV;
