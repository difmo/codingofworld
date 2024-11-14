import React, { useEffect, useState } from "react";
import { FaTimes, FaUser, FaEdit, FaBlog, FaSignOutAlt } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "firebase/auth";
import { db, auth } from "../../firebase";
import Popupbloge from "../../pages/Popupbloge";

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Our Courses", path: "/courses" },
  { id: 3, title: "About Us", path: "/about" },
  { id: 4, title: "Our Training Team", path: "/trainingteam" },
  { id: 6, title: "Contact Us", path: "/contactus" },
  { id: 7, title: "Blogs", path: "/show-blogs" },
  { id: 8, title: "Internship", path: "/internship" },
];

const MainNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Popup state to toggle visibility
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserLogin(user);
        console.log("User is logged in:", user);
      } else {
        setIsUserLogin(null);
        console.log("User is not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User has logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to open the popup
  const openPopup = () => {
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <nav className="sticky top-0 z-20 w-full bg-white shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container flex items-center justify-between py-5 mx-auto"
      >
        {/* Logo section */}
        <div className="flex items-center justify-center">
          <img src={logo} className="h-10 " />
          <div>
            <h1 className="pl-2 text-xl font-bold">
              Coding of <span className="text-primary">World</span>
            </h1>
          </div>
        </div>

        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  className="relative inline-block px-3 py-2 hover:text-secondary group"
                >
                  <div className="absolute bottom-0 hidden w-2 h-2 mt-4 -translate-x-1/2 rounded-full bg-secondary left-1/2 top-1/2 group-hover:block"></div>
                  {menu.title}
                </Link>
              </li>
            ))}
            {isUserLogin === null ? (
              <button
                onClick={() => navigate("/signupscreen")}
                className="primary-btn"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={toggleSidebar}
                className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-700"
              >
                <FaUser />
              </button>
            )}
            <div>
              {/* Sidebar with User Details */}
              {isOpen && (
                <div className="absolute w-64 bg-white border-2 rounded-lg shadow-md top-16 right-5">
                  <button
                    onClick={toggleSidebar}
                    className="absolute p-2 text-gray-600 top-2 right-2 hover:text-gray-800"
                  >
                    <FaTimes />
                  </button>
                  <ul className="p-4 space-y-4">
                    <li>
                      <div
                        onClick={openPopup} // Open the Create Blog popup
                        className="flex items-center text-gray-700 hover:text-blue-600"
                      >
                        <FaBlog className="mr-3" />
                        <span>Create Blogs</span>
                      </div>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex items-center text-gray-700 hover:text-blue-600"
                      >
                        <FaSignOutAlt className="mr-3" />
                        <span>Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </ul>
        </div>

        <div className="lg:hidden">
          <IoMdMenu
            className="text-4xl cursor-pointer"
            onClick={toggleMobileMenu}
          />
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute left-0 right-0 z-40 w-full p-4 mt-2 bg-white shadow-lg lg:hidden top-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-2">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <Link
                    to={menu.path}
                    className="block py-2 hover:text-secondary"
                    onClick={() => setMobileMenuOpen(false)} // Close menu on item click
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
              <button className="primary-btn">Sign In</button>
              <button onClick={handleLogout()} className="primary-btn">
                Logout
              </button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Component */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner form click
          >
            <button
              onClick={closePopup} // Close the popup
              className="absolute p-2 text-gray-600 top-2 right-2 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <Popupbloge setPopUpOpen={closePopup} /> 
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
