import React from "react";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom"; 

const Sidebar = ({ toggleSidebar }) => {
  return (
    <div className=" w-64 h-screen p-4 space-y-6 text-white bg-[#212529] ">
      <div className="flex flex-col w-full p-2 border border-gray-500 rounded-lg">
        <img src={logo} className="h-20 " />
        <p className="mt-2 text-xl font-bold text-center ">Coding Of World</p>
      </div>

      <ul className="space-y-4">
        <li>
          <Link
            to="/home1"
            onClick={() => {
              toggleSidebar(); 
            }}
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
          onClick={() => {
            toggleSidebar(); // Close sidebar when this item is clicked
          }}
            to="/about1"
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            About
          </Link>
        </li>
        <li>
          <Link
          onClick={() => {
            toggleSidebar(); // Close sidebar when this item is clicked
          }}
            to="/services1"
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
          onClick={() => {
            toggleSidebar(); // Close sidebar when this item is clicked
          }}
            to="/starttcsnqt"
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            TCS NQT
          </Link>
        </li>
        <li>
          <Link
          onClick={() => {
            toggleSidebar(); // Close sidebar when this item is clicked
          }}
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
