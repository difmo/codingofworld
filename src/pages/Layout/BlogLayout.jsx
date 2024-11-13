import React, { useState } from 'react'
import { Outlet } from "react-router-dom"; 
import BlogSidebar from '../../components/Navbar/BlogSidebar';
import BlogNavbar from '../../components/Navbar/BlogNavbar';

const BlogLayout = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
    console.log(isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div className={`${!isSidebarOpen ? "hidden " : "flex    "} fixed md:relative transition-all duration-300 ease-in-out  md:flex`}>
        <BlogSidebar toggleSidebar={toggleSidebar}  />
      </div>

      <div className="flex flex-col flex-1">
        <div className="w-full">
          <BlogNavbar toggleSidebar={toggleSidebar}   /> 
        </div>
        <div className="flex-1 p-8 overflow-y-auto ">
          {children}
          <Outlet />
        </div>
      </div>

      </div>
  );
};

export default BlogLayout;







