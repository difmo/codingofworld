import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ShowCourseNavbar = ({ toggleSidebar }) => {
  // Close the sidebar if clicked outside
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
    <div className="top-0 z-30 bg-black dark:bg-gray-800  border-gray-500 transition-all duration-300 ease-in-out">
   

      {/* Mobile View */}
      <div className="flex items-center justify-between p-4 md:hidden">
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

export default ShowCourseNavbar;
