import { useState } from "react";

import { Outlet } from "react-router-dom";
import CourseSidebar from "../../components/Navbar/CourseSidebar";

const CourseLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div className="flex h-screen">
      <div
        className={`${
          !isSidebarOpen ? "hidden " : "flex    "
        } fixed md:relative transition-all duration-300 ease-in-out  md:flex`}
      >
        <CourseSidebar />
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

export default CourseLayout;
