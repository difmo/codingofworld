import React, { useEffect, useState, useRef } from "react";
import {
  FaTimes,
  FaUser,
  FaBlog,
  FaSignOutAlt,
  FaPersonBooth,
} from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "firebase/auth";
import { db, auth } from "../../firebase";
import Popupbloge from "../../pages/Popupbloge";
import AdminController from "../../Controller/AdminController";

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Our Courses", path: "/courses" },
  // { id: 2, title: "Our Courses2", path: "/show-coursee" },
  { id: 3, title: "Internship", path: "/internship" },
  { id: 4, title: "About Us", path: "/about" },
  { id: 5, title: "Contact Us", path: "/contactus" },
  { id: 6, title: "Blogs", path: "/show-blogs" },
];

const MainNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control the modal visibility
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const { isAdmin, isUserLogin, blogPermission } = AdminController();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User has logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const openPopup = () => setShowPopup(true); // Open the modal
  const closePopup = () => setShowPopup(false); // Close the modal

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // dsfsfsfddsfdff

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <nav className="sticky top-0 z-20 w-full bg-white shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container flex items-center justify-between px-4 py-4 mx-auto"
      >
        <div className="flex items-center justify-center">
          <img src={logo} className="h-10 " />
          <div>
            <h1 className="pl-2 text-xl font-bold text-secondaryblue font-play ">
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
                  className="relative text-secondaryblue inline-block px-3 py-2 font-play hover:text-secondary group"
                >
                  <div className="absolute bottom-0  hidden w-2 h-2 mt-4 -translate-x-1/2 rounded-full bg-secondary font-play left-1/2 top-1/2 group-hover:block"></div>
                  {menu.title}
                </Link>
              </li>
            ))}

            {!isUserLogin ? (
              <button
                onClick={() => navigate("/loginscreen")}
                className="h-8 text-[16px] px-8 py-1 rounded-md bg-red-100 text-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 hover:text-white"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={toggleSidebar}
                className="p-2 text-white rounded-full bg-primary hover:bg-primary/70"
              >
                <FaUser />
              </button>
            )}

            <a href="tel:+9194455791624" className="flex items-center">
              <button className="flex items-center gap-2 text-[16px] px-4 h-8 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M22 16.92v3.34a2.25 2.25 0 01-2.45 2.24A20.31 20.31 0 012.54 5.46 2.25 2.25 0 014.78 3H8.2a2.25 2.25 0 012.25 2.03 14.91 14.91 0 001.07 4.42 2.25 2.25 0 01-.51 2.35l-1.33 1.33a16.82 16.82 0 006.29 6.29l1.33-1.33a2.25 2.25 0 012.35-.51 14.91 14.91 0 004.42 1.07A2.25 2.25 0 0122 16.92z" />
                </svg>
                Call now
              </button>
            </a>

            <div>
              {isOpen && (
                <div className="absolute w-64 bg-white border-2 rounded-lg shadow-md top-16 right-5">
                  <button
                    onClick={toggleSidebar}
                    className="absolute p-2 text-gray-600 top-2 right-2 hover:text-gray-800"
                  >
                    <FaTimes />
                  </button>
                  <ul className="p-4 space-y-4 font-play">
                    {isAdmin && (
                      <li>
                        <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600">
                          <FaPersonBooth className="mr-3 font-play" />
                          <span onClick={() => navigate("/admin-dashboard")}>
                            Admin
                          </span>
                        </div>
                      </li>
                    )}

                    {/* Show Create Blogs if blogPermission is false */}
                    {!blogPermission ? (
                      <li>
                        <div
                          onClick={openPopup}
                          className="flex items-center text-gray-700 cursor-pointer font-play hover:text-blue-600"
                        >
                          <FaBlog className="mr-3" />
                          <span>Create Blogs</span>
                        </div>
                      </li>
                    ) : (
                      <li>
                        <div className="flex items-center text-gray-700 cursor-pointer font-play hover:text-blue-600">
                          <FaBlog className="mr-3" />
                          <span onClick={() => navigate("/all-blogs")}>
                            Your Blogs
                          </span>
                        </div>
                      </li>
                    )}

                    <li>
                      <a
                        href="#"
                        className="flex items-center text-gray-700 font-play hover:text-blue-600"
                      >
                        <FaSignOutAlt className="mr-3" />
                        <span onClick={handleLogout}>Logout</span>
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

      {/* Mobile Menu start */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute left-0 right-0 z-40 w-full p-4 bg-white shadow-lg lg:hidden top-full"
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
                    className="block py-2 font-play hover:text-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
              {!isUserLogin ? (
                <button
                  onClick={() => {
                    navigate("/signupscreen");
                    setMobileMenuOpen(false);
                  }}
                  className="primary-btn"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={toggleSidebar}
                  className="w-10 p-3 text-center text-white rounded-full bg-primary hover:bg-primary/70"
                >
                  <FaUser />
                </button>
              )}
            </ul>
            {isOpen && (
              <div className="absolute w-64 bg-white border-2 rounded-lg shadow-md top-16 right-5">
                <button
                  onClick={toggleSidebar}
                  className="absolute p-2 text-gray-600 top-2 right-2 hover:text-gray-800"
                >
                  <FaTimes />
                </button>
                <ul className="p-4 space-y-4">
                  {isAdmin && (
                    <li>
                      <div className="flex items-center text-gray-700 cursor-pointer font-play hover:text-blue-600">
                        <FaPersonBooth className="mr-3" />
                        <span onClick={() => navigate("/admin-dashboard")}>
                          Admin
                        </span>
                      </div>
                    </li>
                  )}

                  {/* Show Create Blogs if blogPermission is false */}
                  {!blogPermission ? (
                    <li>
                      <div
                        onClick={openPopup}
                        className="flex items-center text-gray-700 cursor-pointer font-play hover:text-blue-600"
                      >
                        <FaBlog className="mr-3" />
                        <span>Create Blogs</span>
                      </div>
                    </li>
                  ) : (
                    <li>
                      <div className="flex items-center text-gray-700 cursor-pointer font-play hover:text-blue-600">
                        <FaBlog className="mr-3" />
                        <span onClick={() => navigate("/all-blogs")}>
                          Your Blogs
                        </span>
                      </div>
                    </li>
                  )}

                  <li>
                    <a
                      href="#"
                      className="flex items-center text-gray-700 font-play hover:text-blue-600"
                    >
                      <FaSignOutAlt className="mr-3" />
                      <span onClick={handleLogout}>Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div
            ref={popupRef}
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg popup-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute p-2 text-gray-600 top-2 right-2 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <Popupbloge onClose={closePopup} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
