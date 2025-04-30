import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import ShowCourseSidebar from "./ShowCourseSidebar";
import ShowCourseNavbar from "./ShowCourseNavbar";

const ShowCourseLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen dark:bg-gray-900 transition-all duration-300 ease-in-out">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative transition-transform duration-300 ease-in-out md:flex md:translate-x-0 flex-col bg-secondaryblue dark:bg-gray-800 w-72 h-full p-4 space-y-6 text-primary overflow-y-auto`}
      >
        <ShowCourseSidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <div className="w-full">
          <ShowCourseNavbar toggleSidebar={toggleSidebar} />
        </div>
        <div className="flex-1 p-3 md:p-8 overflow-y-auto bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out">
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ShowCourseLayout;
