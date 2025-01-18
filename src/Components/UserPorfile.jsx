import React, { useEffect, useState } from 'react';
import UserNav from './UserNav';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage("User is not logged in");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);  // Store user data
      } else {
        setMessage(data.message);  // Display error message
      }
    } catch (error) {
      setMessage('Error fetching profile');
    }
  };

  return (
    <div>
        <UserNav/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Profile</h1>
      
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}
      
      {user ? (
        <div>
          <div className="mb-4">
            <p className="text-xl font-medium text-gray-700">Name: <span className="font-normal text-gray-500">{user.name}</span></p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-medium text-gray-700">Email: <span className="font-normal text-gray-500">{user.email}</span></p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-medium text-gray-700">Role: <span className="font-normal text-gray-500">{user.role}</span></p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  </div>
  </div>
  );
};

export default UserProfile;
