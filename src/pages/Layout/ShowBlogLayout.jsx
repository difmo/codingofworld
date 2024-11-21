import React from "react";
import { Outlet } from "react-router-dom";
import ShowblogSidebar from "../../components/Navbar/ShowblogSidebar";
import MainNavbar from "../../components/Navbar/MainNavbar";
import Footer from "../../components/Footer/Footer";

const ShowBlogLayout = ({ children }) => {
  return (
   

      <div className="flex flex-1">
     

        <div className="flex-1 md:container overflow-y-auto ">
          {children}
          
          <Outlet />
        </div>
      </div>

  );
};

export default ShowBlogLayout;
