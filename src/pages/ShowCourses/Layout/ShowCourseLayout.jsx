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
    <div className="flex h-screen">
      <div
        ref={sidebarRef}
        className={`${
          !isSidebarOpen ? "hidden " : "flex "
        } fixed md:relative transition-all duration-300 ease-in-out md:flex`}
      >
        <ShowCourseSidebar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-col flex-1">
        <div className="w-full">
          <ShowCourseNavbar toggleSidebar={toggleSidebar} />
        </div>
        <div className="flex-1 p-0 md:p-8 overflow-y-auto bg-white">
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ShowCourseLayout;
