import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FiArrowLeftCircle, FiMenu } from 'react-icons/fi'; // Importing the menu icon from react-icons

const ShowCourseNavbar = ({ toggleSidebar }) => {
  const handleClickOutside = (event) => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !sidebar.contains(event.target)) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Use 'mousedown' for better outside click detection
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="  relative z-30 bg-black dark:bg-gray-800 border-gray-500 transition-all duration-300 ease-in-out">
      {/* Mobile View */}
      <div className="flex top-5 right-5 absolute items-center justify-between  md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          <FiArrowLeftCircle className="" /> {/* Using the React icon */}
        </button>
      </div>
    </div>
  );
};

ShowCourseNavbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default ShowCourseNavbar;
