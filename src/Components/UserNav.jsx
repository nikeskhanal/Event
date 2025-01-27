import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserNav = () => {
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout logic here (e.g., remove token, etc.)
        console.log('Logged out');
        navigate('/'); // Redirect to login page
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
                setUnreadNotifications(response.data.unreadCount); // Set unread notifications count
            } catch (err) {
                console.error('Error fetching notifications:', err);
            }
        };

        fetchNotifications();
    }, []); // Fetch notifications once on mount

    return (
        <nav className="bg-blue-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">
                    <NavLink to="/user-home">MyApp</NavLink>
                </h1>
                <ul className="flex space-x-6">
                    {/* Home Link */}
                    <li>
                        <NavLink
                            to="/user-home"
                            className={({ isActive }) =>
                                isActive ? 'text-gray-200 font-bold' : 'text-white hover:text-gray-200'
                            }
                        >
                            Home
                        </NavLink>
                    </li>

                    {/* Quiz Play Link */}
                    <li>
                        <NavLink
                            to="/quiz/:quizId" // Replace with actual quiz ID or dynamic path
                            className={({ isActive }) =>
                                isActive ? 'text-gray-200 font-bold' : 'text-white hover:text-gray-200'
                            }
                        >
                            Quiz Play
                        </NavLink>
                    </li>

                    {/* Profile Link */}
                    <li>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? 'text-gray-200 font-bold' : 'text-white hover:text-gray-200'
                            }
                        >
                            Profile
                        </NavLink>
                    </li>

                    {/* Notifications Link with Unread Badge */}
                    <li>
                        <NavLink
                            to="/userNoti"
                            className={({ isActive }) =>
                                isActive ? 'text-gray-200 font-bold' : 'text-white hover:text-gray-200'
                            }
                        >
                            Notifications
                            {unreadNotifications > 0 && (
                                <span className="ml-2 text-red-500 font-bold">{unreadNotifications}</span>
                            )}
                        </NavLink>
                    </li>

                    {/* Logout Button */}
                    <li>
                        <button
                            onClick={handleLogout}
                            className="text-white hover:text-gray-200 font-medium"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default UserNav;
