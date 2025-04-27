import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Trash2, CheckCircle } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to load notifications.");
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchNotifications(); // refresh
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchNotifications(); // refresh
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Bell size={24} /> Notifications
      </h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li
              key={note._id}
              className="bg-white p-4 shadow rounded-md flex justify-between items-start"
            >
              <div>
                <p className="text-gray-800">{note.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  From: {note.sender?.name} ({note.sender?.email})
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {!note.isRead && (
                  <button
                    onClick={() => markAsRead(note._id)}
                    className="text-green-600 hover:text-green-800"
                    title="Mark as Read"
                  >
                    <CheckCircle />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(note._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
