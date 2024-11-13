import React from "react";
import MainNavbar from "../../components/Navbar/MainNavbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <MainNavbar />
      <main>
        {children}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
