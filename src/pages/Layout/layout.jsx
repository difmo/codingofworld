import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className=""> 
        {children}
        <Outlet/>
      </main>
      <Footer/> 
    </div>
  );
};

export default Layout;
