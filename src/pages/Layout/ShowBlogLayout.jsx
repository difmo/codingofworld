import React from "react";
import { Outlet } from "react-router-dom";
import ShowblogSidebar from "../../components/Navbar/ShowblogSidebar";
import MainNavbar from "../../components/Navbar/MainNavbar";
import Footer from "../../components/Footer/Footer";

const ShowBlogLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-800">
        <MainNavbar />
      </div>

      <div className="flex flex-1">
        <div className="sticky w-64 bg-gray-800">
          <ShowblogSidebar />
        </div>

        <div className="flex-1 p-8 overflow-y-auto text-white bg-black">
          {children}
          
          <Outlet />
        </div>
      </div>

    <Footer/>
    </div>
  );
};

export default ShowBlogLayout;
