import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', 
  });

  const [message, setMessage] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage('Signup successful');
        alert('Signup successful!'); 
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Network error: Could not connect to the server');
    }
  };
  

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100" style={{ backgroundImage: 'url("./src/assets/bgg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      <h2 className="text-6xl font-semibold text-center text-white animate-pulse mb-6">Welcome to Event Manager</h2>

      <div className="max-w-md mx-auto p-6  bg-white bg-opacity-50 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

         
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </button>
          </div>
        </form>

       
        {message && <p className="mt-4 text-center text-sm font-medium text-red-600">{message}</p>}

      
        <div className="flex justify-center mt-4">
          <p className="text-center text-sm text-gray-600">
            Already Have an Account?{' '}
            <Link to="/" className="text-blue-500 hover:underline ml-1">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
