import React, { useState } from "react";
import { FaTimes, FaUser, FaEdit, FaBlog, FaSignOutAlt } from "react-icons/fa";

const UserDetails = () => {
  // State to control the visibility of the user details sidebar
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Profile Icon to toggle the sidebar */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-700"
      >
        <FaUser />
      </button>

      {/* Sidebar with User Details */}
      {isOpen && (
        <div className="bg-white shadow-md w-64 absolute top-16 right-5 border-2 rounded-lg">
          <button
            onClick={toggleSidebar}
            className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-800"
          >
            <FaTimes />
          </button>
          <ul className="space-y-4 p-4">
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaUser className="mr-3" />
                <span>My Profile</span>
              </a>
            </li>
            <li>
              <a
                href="/myCourses/"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaBlog className="mr-3" />
                <span>Create Blogs</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaEdit className="mr-3" />
                <span>Edit Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaSignOutAlt className="mr-3" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
