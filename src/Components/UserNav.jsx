import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  LogOut, User, Home } from 'lucide-react';

const UserNav = () => {
  
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logged out');
        navigate('/');
    };

   
    return (
        <nav className="bg-gray-900 text-white p-4 shadow-lg fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Event Manager</h1>
                <ul className="flex space-x-6 items-center">
                    <li>
                        <NavLink
                            to="/user-home"
                            className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-blue-400' : 'hover:text-gray-300'}`}
                        >
                            <Home size={20} /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/userprofile"
                            className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-blue-400' : 'hover:text-gray-300'}`}
                        >
                            <User size={20} /> Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/notifications"
                            className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-blue-400' : 'hover:text-gray-300'}`}
                        >
                            <Home size={20} /> Notifications
                        </NavLink>
                    </li>
                   
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition"
                        >
                            <LogOut size={20} /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default UserNav;
