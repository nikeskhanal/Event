import React, { useState } from 'react';
import { Send } from 'lucide-react';

const SendMessage = ({ applicantId, sendNotification }) => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) {
      setStatus({ type: 'error', message: 'Message cannot be empty.' });
      return;
    }
    if (message.length < 5) {
      setStatus({ type: 'error', message: 'Message must be at least 5 characters long.' });
      return;
    }

    setLoading(true); // Start loading

    try {
      await sendNotification(applicantId, message);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setMessage('');
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col space-y-3 w-full">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message here..."
        rows="4"
        className="border border-gray-300 rounded-md p-2 w-full sm:w-2/3 resize-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      ></textarea>

      <button
        onClick={sendMessage}
        disabled={loading}
        className={`flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full sm:w-auto ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <span className="flex items-center">
            <Send className="animate-spin w-4 h-4 mr-2" /> Sending...
          </span>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" /> Send Message
          </>
        )}
      </button>

      {status.message && (
        <div
          className={`mt-2 text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
          role="status"
          aria-live="assertive"
        >
          {status.message}
        </div>
      )}
    </div>
  );
};

export default SendMessage;
