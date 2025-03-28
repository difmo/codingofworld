import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import AdminSideMenu from "../../components/Navbar/AdminSideMenu";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

const AdminLayout = ({ children }) => {
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
        <AdminSideMenu isSidebarOpen={isSidebarOpen} />
      </div>

      <div className="flex flex-col flex-1">
        <div className="w-full">
          <AdminNavbar toggleSidebar={toggleSidebar} />
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
