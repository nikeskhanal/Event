import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserNoti = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User not logged in. Please log in to view notifications.");
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(response.data.notifications);
      } catch (err) {
        setError('Failed to load notifications.');
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserNoti;
