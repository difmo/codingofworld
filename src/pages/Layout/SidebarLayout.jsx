import React, { useState } from "react";

import { Outlet } from "react-router-dom"; 
import Sidebar from "./Sidebar";
import StudentNavbar from "../../components/Navbar/StudentNavbar";

const SidebarLayout = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
    console.log(isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div className={`${!isSidebarOpen ? "hidden" : "flex "}  w-64  md:flex`}>
        <Sidebar   />
      </div>

      <div className="flex flex-col flex-1">
        <div className="w-full">
          <StudentNavbar toggleSidebar={toggleSidebar}   /> 
        </div>
        <div className="flex-1 p-8 overflow-y-auto bg-black">
          {children}
          <Outlet />
        </div>
      </div>

      </div>
  );
};

export default SidebarLayout;
