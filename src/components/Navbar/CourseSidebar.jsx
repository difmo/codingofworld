import React from "react";
import logo from "../../assets/images/logo.svg"; // Uncomment if you want the logo
import { Link } from "react-router-dom";

const CourseSidebar = ({ toggleSidebar }) => {
  return (
    <div className="w-64 h-screen  text-black p-5 space-y-6 shadow-lg">
      <div className="flex flex-col items-center p-2 mb-6">
        {/* Uncomment if you want to display the logo */}
        {/* <img src={logo} alt="Logo" className="h-20 mb-4" /> */}
        <p className="text-2xl font-bold">Coding Of World</p>
      </div>

      <ul className="space-y-4">
        <li>
          <Link
            to="/#"
            onClick={() => toggleSidebar()}
            className="block px-4 py-2 text-black  hover:bg-red-400 transition-colors"
          >
            Add Blogs
          </Link>
        </li>
        <li>
          <Link
            to="#"
            // onClick={() => toggleSidebar()}
            className="block px-4 py-2 text-black  hover:bg-red-400 transition-colors"
          >
            All Blogs
          </Link>
        </li>
      </ul>

      <div className="absolute bottom-6 w-full text-center">
        <Link
          to="#"
          //   onClick={() => toggleSidebar()}
          className="block text-sm text-gray-400 hover:text-white"
        >
          &copy; 2024 Coding Of World
        </Link>
      </div>
    </div>
  );
};

export default CourseSidebar;
