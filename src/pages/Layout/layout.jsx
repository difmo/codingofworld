import React from "react";
import Navbar from "../../components/Navbar/MainNavbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>
        {children}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
