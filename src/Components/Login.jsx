import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); 

        if (data.user.role === 'recruiter') {
          navigate(`/${data.user.id}/recruiter-home`); 
        } else if (data.user.role === 'user') {
          navigate(`/${data.user.id}/user-home`); 
        }
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

      <div className="max-w-md mx-auto p-6 bg-white bg-opacity-50 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-all duration-300"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-all duration-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        
        <div className="flex justify-center mt-4">
          <p>
            Don't have an account? 
            <Link to="/signup" className="text-blue-500 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
