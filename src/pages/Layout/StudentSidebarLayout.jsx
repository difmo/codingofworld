import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import StudentSidebar from "../../components/Navbar/StudentSidebar";
import StudentNavbar from "../../components/Navbar/StudentNavbar";

const StudentSidebarLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`${
          !isSidebarOpen ? "hidden " : "flex    "
        } fixed md:relative transition-all duration-300 ease-in-out  md:flex`}
      >
        <StudentSidebar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-col flex-1">
        <div className="w-full">
          <StudentNavbar toggleSidebar={toggleSidebar} />
        </div>
        <div className="flex-1 p-8 overflow-y-auto bg-black">
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentSidebarLayout;
