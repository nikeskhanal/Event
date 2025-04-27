import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewCV = () => {
  const [cvUrl, setCvUrl] = useState("");

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/viewcv", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust as needed
          },
          responseType: "blob", // Important to treat response as file
        });

        const file = new Blob([res.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setCvUrl(fileURL);
      } catch (error) {
        console.error("Error fetching CV:", error);
      }
    };

    fetchCV();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">My CV</h2>
      {cvUrl ? (
        <iframe
          src={cvUrl}
          title="CV Viewer"
          width="100%"
          height="600px"
        ></iframe>
      ) : (
        <p>Loading CV...</p>
      )}
    </div>
  );
};

export default ViewCV;
