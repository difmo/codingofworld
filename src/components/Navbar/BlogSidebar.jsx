


import React from "react";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom"; 

const BlogSidebar = ({ toggleSidebar }) => {
  return (
    <div className="w-64 h-screen p-4 space-y-6 text-white ">
      <div className="flex flex-col w-full p-2 border border-gray-500 rounded-lg">
        <img src={logo} className="h-20 " />
        <p className="mt-2 text-xl font-bold text-center ">Coding Of World</p>
      </div>

      <ul className="space-y-4">
        <li>
          <Link
            to="/addblogs"
            onClick={() => {
              toggleSidebar(); 
            }}
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            Add Blogs
          </Link>
        </li>
        <li>
          <Link
            to="/all-blogs"
            onClick={() => {
              toggleSidebar(); 
            }}
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
          >
            All Blogs
          </Link>
        </li>
    
       
     
        
      </ul>
    </div>
  );
};

export default BlogSidebar;
