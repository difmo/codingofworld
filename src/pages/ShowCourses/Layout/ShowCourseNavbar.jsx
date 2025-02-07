import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ShowCourseNavbar = ({toggleSidebar}) => {

const ShowCourseNavbar = ({ toggleSidebar }) => {
  const handleClickOutside = (event) => {
    if (!event.target.closest('.sidebar')) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="top-0 z-30 bg-black border-b border-gray-500">
      <div className="items-center justify-between hidden p-4 md:flex">
        <div className="text-lg font-semibold text-white">Create Courses</div>
      </div>

      <div className="flex items-center justify-between p-4 md:hidden">
        {/* <div className="text-lg font-semibold text-white">StudentNavbar</div> */}
        <button
          className="text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

ShowCourseNavbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
 
  return (
    <div className="top-0 z-30  border-gray-500">
      <div className="items-center justify-between hidden p-4 md:flex">
      </div>

      <div className="flex items-center justify-between p-4 md:hidden">
        {/* <div className="text-lg font-semibold text-white">StudentNavbar</div> */}
        <button
          className="text-grey bg-transparent focus:outline-none"
          onClick={toggleSidebar}   
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

    
    </div>
  );
};

export default ShowCourseNavbar;
