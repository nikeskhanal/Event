import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logged out');
        navigate('/'); // Redirect to login page
    };

    return (
        <nav className="bg-black shadow-md border-b border-gray-200 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo / Brand */}
                <h1 className="text-xl font-bold text-white">Event Manager</h1>

                {/* Navigation Links */}
                <ul className="flex space-x-6 items-center">
                    <li>
                        <NavLink
                            to="/recruiter-home"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 ${
                                    isActive ? 'text-blue-600 font-semibold' : 'text-white hover:text-blue-500'
                                }`
                            }
                        >
                            <Home size={20} />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 ${
                                    isActive ? 'text-blue-600 font-semibold' :  'text-white hover:text-blue-500'
                                }`
                            }
                        >
                            <User size={20} />
                            <span>Profile</span>
                        </NavLink>
                    </li>
                    <li>
                    <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition"
                        >
                            <LogOut size={20} /> Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
