import React from 'react';

import { Outlet } from 'react-router-dom'; // Outlet to render nested routes
import Sidebar from './Sidebar';
import Navbar from '../../components/Navbar/Navbar';

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="flex flex-1">
        {/* Sidebar: Fixed width */}
        <div className="w-64 p-4 text-white bg-gray-800">
          <Sidebar />
        </div>

        {/* Main content: Takes the rest of the space */}
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
