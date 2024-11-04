// src/pages/Layout/SidebarLayout.js
import React from 'react';
import Sidebar from './Sidebar';

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default SidebarLayout;
