import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
       
        console.log('Logged out');
        navigate('/'); // Redirect to login page
    };

    return (
        <nav className="bg-gray-500 p-4 shadow-md">
            
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">
                   
                </h1>
                <ul className="flex space-x-6">
                    <li>
                        <NavLink
                            to="/id:/recruiter-home"
                            className={({ isActive }) =>
                                isActive ? 'text-gray-200 font-bold' : 'text-white hover:text-gray-200'
                            }
                        >
                            Home
                        </NavLink>
                    </li>
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
                    <li>
                        <NavLink
                            to="/notification"
                            className={({ isActive }) =>
                                isActive ? 'text-gray-200 font-bold' : 'text-white hover:text-gray-200'
                            }
                        >
                            Notifications
                        </NavLink>
                    </li>
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

export default Navbar;
