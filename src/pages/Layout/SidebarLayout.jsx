import React from "react";

import { Outlet } from "react-router-dom"; 
import Sidebar from "./Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-64 text-white">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
          <Outlet />
        </div>
      </div>

      {/* Footer: Full width */}
    </div>
  );
};

export default SidebarLayout;
