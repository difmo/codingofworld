import { useState } from "react";

import { Outlet } from "react-router-dom";
import ShowBlogSidebar from "./ShowBlogSidebar";

const ShowBlogLayoutNew = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div className="flex h-screen bg-dark">
      <div
        className={`${
          !isSidebarOpen ? "hidden " : "flex    "
        } fixed md:relative transition-all duration-300 ease-in-out  md:flex`}
      >
        <ShowBlogSidebar />
      </div>

      <div className="flex flex-col flex-1">
        <div className="w-full">
          {/* <AdminNavbar toggleSidebar={toggleSidebar} /> */}
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ShowBlogLayoutNew;
