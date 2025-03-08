import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bell, LogOut, User, Home } from 'lucide-react';

const UserNav = () => {
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logged out');
        navigate('/');
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get('http://localhost:4000/api/notifications/unread', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUnreadNotifications(response.data.unreadCount);
            } catch (err) {
                console.error('Error fetching notifications:', err);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-lg fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">SewaMate</h1>
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
                    <li className="relative">
                        <NavLink
                            to="/usernoti"
                            className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-blue-400' : 'hover:text-gray-300'}`}
                        >
                            <Bell size={20} /> Notifications
                            {unreadNotifications > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 absolute -top-2 -right-2">
                                    {unreadNotifications}
                                </span>
                            )}
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
