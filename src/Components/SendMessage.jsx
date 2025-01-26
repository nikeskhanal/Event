import React, { useState } from 'react';
import axios from 'axios';

const SendMessage = ({ jobId, applicantId }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (!message) {
      setError('Message cannot be empty.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/notifications/send',
        {  userId, message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setSuccess('Message sent successfully!');
      setMessage('');
    } catch (err) {
      setError('Failed to send message.');
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
      ></textarea>
      <button onClick={sendMessage}>Send Message</button>

      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
    </div>
  );
};

export default SendMessage;
