import React from "react";
import { Link } from "react-router-dom"; 

const Sidebar = () => {
  return (
    <div className="sticky top-0 w-64 h-screen p-4 space-y-6 text-white bg-gray-800">
      <div className="mb-8 text-xl font-bold text-center">My App</div>

      <ul className="space-y-4">
        <li>
          <Link
            to="/home1"
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about1"
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/services1"
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/starttcsnqt"
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            TCS NQT
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
