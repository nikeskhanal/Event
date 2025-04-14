import { useState } from "react";
import axios from "axios";

const SendNotification = () => {
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!senderName || !message || !recipientId) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/notifications", {
        senderName,
        message,
        recipient: recipientId,
      });

      console.log("Notification sent:", res.data);
      alert("Notification sent successfully!");

      // Clear form
      setSenderName("");
      setMessage("");
      setRecipientId("");
    } catch (error) {
      console.error("Failed to send notification", error);
      alert("Failed to send notification");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Send Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Sender Name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Recipient User ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default SendNotification;
