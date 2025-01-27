import React, { useState } from 'react';
import axios from 'axios';

const SendMessage = ({ applicantId, sendNotification }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      setError('Message cannot be empty.');
      setSuccess('');
      return;
    }

    try {
      await sendNotification(applicantId, message); // Use the passed-down function
      setSuccess('Message sent successfully!');
      setError('');
      setMessage('');
    } catch (err) {
      setError('Failed to send message. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Write your message here..."
        rows="4"
        cols="50"
        className="border border-gray-300 rounded-md p-2 w-full"
      ></textarea>
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Send Message
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-500 mt-2">{success}</div>}
    </div>
  );
};

export default SendMessage;
