import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const UserNav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout logic here
        console.log('Logged out');
        navigate('/'); // Redirect to login page
    };

    return (
        <nav className="bg-blue-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">
                    <NavLink to="/user-home">MyApp</NavLink>
                </h1>
                <ul className="flex space-x-6">
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
                    <NavLink
                            to="/quiz/:quizId"
                            className={({ isActive }) =>
                                isActive ? 'text-gray-200 font-bold' : 'text-white hover:text-gray-200'
                            }
                        >
                            quizplay
                        </NavLink>
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
