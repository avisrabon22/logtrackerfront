import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
    const TopBar = () => {
        const [dropdownOpen, setDropdownOpen] = useState(false);

        const toggleDropdown = () => {
            setDropdownOpen(!dropdownOpen);
        };

        // Function to close the dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownOpen && !event.target.closest('.relative')) {
            setDropdownOpen(false);
            }
        };

        // Add event listener to handle clicks outside
        React.useEffect(() => {
            document.addEventListener('click', handleClickOutside);
            return () => {
            document.removeEventListener('click', handleClickOutside);
            };
        }, [dropdownOpen]);

        return (
            <div className="bg-gray-700 p-4 w-full top-0 z-10 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-bold">Log Tracker</div>
            <nav className="flex space-x-4 items-center">
            <NavLink to="/dashboard" className="text-gray-300 hover:text-white">Home</NavLink>
            <NavLink to="/log-board" className="text-gray-300 hover:text-white">LogBoard</NavLink>
            <NavLink to="/log-on-board" className="text-gray-300 hover:text-white">LogOnBoard</NavLink>
            <NavLink to="/floor-map" className="text-gray-300 hover:text-white">FloorMap</NavLink>
            
            <NavLink to="/logout" className="text-gray-300 bg-red-500 rounded-sm hover:text-white ">Signout</NavLink>
            <div className="relative">
                <button onClick={toggleDropdown} className="text-gray-300 hover:text-white focus:outline-none">
                More
                </button>
                {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-20">
                <NavLink to="/users" className="block px-4 py-2 text-gray-300 hover:text-white">Users</NavLink>
                <NavLink to="/get-roles" className="block px-4 py-2 text-gray-300 hover:text-white">Roles</NavLink>
                <NavLink to="/profile" className="block px-4 py-2 text-gray-300 hover:text-white">Profile</NavLink>
                <NavLink to="/about" className="block px-4 py-2 text-gray-300 hover:text-white">About</NavLink>
                </div>
                )}
            </div>
            </nav>
            </div>
            </div>
        );
    };
export default TopBar