import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-screen p-5  sticky top-0">
      <h1 className="text-white text-2xl mb-6">My Sidebar</h1>
      <ul>
        <li className="text-gray-300 hover:bg-gray-700 p-2 rounded">
          <Link to="/home1">Home</Link>
        </li>
        <li className="text-gray-300 hover:bg-gray-700 p-2 rounded">
          <Link to="/about1">About</Link>
        </li>
        <li className="text-gray-300 hover:bg-gray-700 p-2 rounded">
          <Link to="/services1">Services</Link>
        </li>
        <li className="text-gray-300 hover:bg-gray-700 p-2 rounded">
          <Link to="/starttcsnqt">Start TCS NQT</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
