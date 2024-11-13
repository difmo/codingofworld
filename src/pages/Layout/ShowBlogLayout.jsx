import React from "react";
import { Outlet } from "react-router-dom";
import ShowblogSidebar from "../../components/Navbar/ShowblogSidebar";
import MainNavbar from "../../components/Navbar/MainNavbar";
import Footer from "../../components/Footer/Footer";

const ShowBlogLayout = ({ children }) => {
  return (
   

      <div className="flex flex-1">
        <div className="sticky w-64 h-screen top-20 ">
          <ShowblogSidebar />
        </div>

        <div className="flex-1 p-8 overflow-y-auto ">
          {children}
          
          <Outlet />
        </div>
      </div>

  );
};

export default ShowBlogLayout;
