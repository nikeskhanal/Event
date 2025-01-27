import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserNoti = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [unreadCount, setUnreadCount] = useState(0); // Track unread notifications

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User not logged in. Please log in to view notifications.");
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/notifications/:id', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.notifications.length); // Set initial unread count
      } catch (err) {
        setError('Failed to load notifications.');
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/notifications/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state by removing the notification
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
      setUnreadCount((prev) => prev - 1); // Decrease the unread count
    } catch (err) {
      console.error('Failed to mark notification as read:', err.response?.data || err.message);
    }
  };

  return (
    <div>
      {/* Notification Bell with Count */}
      <div className="flex items-center mb-4">
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            {unreadCount}
          </span>
        )}
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {/* Notification List */}
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className="flex justify-between items-center border-b border-gray-300 py-2"
          >
            <span>{notification.message}</span>
            <button
              onClick={() => handleMarkAsRead(notification._id)}
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
            >
              Read
            </button>
          </li>
        ))}
      </ul>

      {/* No notifications message */}
      {notifications.length === 0 && !error && (
        <div className="text-gray-500">No new notifications.</div>
      )}
    </div>
  );
};

export default UserNoti;
