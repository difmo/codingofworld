import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import { FiAlignRight, FiArrowDownRight, FiArrowLeft, FiArrowLeftCircle, FiArrowRight, FiToggleLeft } from "react-icons/fi";

const ProfileLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen dark:bg-dark relative">
      <div
        className={`${
          isSidebarOpen ? "flex" : "hidden"
        } fixed  md:relative md:flex z-10  transition-all duration-300 ease-in-out`}
      >
        <ProfileSidebar isSidebarOpen={isSidebarOpen} />
      </div>

      <div className="flex flex-col flex-1">
       
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 p-4 ">
          {children}
          <Outlet />
        </div>

        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 z-30 px-4 py-2 bg-red-500 hover:bg-blue-700 text-white rounded-md shadow transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 md:hidden"
        >
       { !isSidebarOpen ?  <FiArrowRight/> : <FiArrowLeft/>}
        </button>
      </div>
    </div>
  );
};

export default ProfileLayout;
