import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className=""> {/* Add padding to avoid overlap */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
