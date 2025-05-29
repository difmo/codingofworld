import { useEffect, useState, useRef } from "react";
import { FaTimes, FaUser, FaMoon, FaSun } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import Popupbloge from "../../pages/Popupbloge";
import { useProfile } from "../../context/Providers/ProfileContext";
import RouteConstants from "../../utils/RouteConstants";

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Our Courses", path: "/courses" },
  { id: 3, title: "Programs", path: "/programs" },
  { id: 4, title: "About Us", path: "/about" },
  { id: 5, title: "Contact Us", path: "/contactus" },
  { id: 6, title: "Blogs", path: "blogs/show-blogs" },
];

const MainNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const { isUserLogin } = useProfile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };



  const closePopup = () => setShowPopup(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
    }
  };

 useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


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
   <nav className={`fixed top-0 z-20 w-full transition-all duration-700 ease-in-out ${isScrolled ? 'bg-white shadow-md dark:bg-dark' : 'bg-transparent'} `}>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container flex items-center justify-between px-4 py-2 mx-auto"
      >
        <div onClick={() => navigate(RouteConstants.MAINROUTE.HOME)} className="flex items-center justify-center ">
          <img src={logo} alt="coding of world" className="h-10 cursor-pointer" />
          <div>
            <h1 className="pl-2 text-xl font-bold cursor-pointer text-secondaryblue font-play dark:text-white">
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
                  className={`relative inline-block px-3 py-2 text-secondaryblue font-play hover:text-secondary group  ${!isScrolled?"dark:text-secondaryblue":"dark:text-white"}`}
                >
                  <div className="absolute bottom-0 hidden w-2 h-2 mt-4 -translate-x-1/2 rounded-full bg-secondary font-play left-1/2 top-1/2 group-hover:block"></div>
                  {menu.title}
                </Link>
              </li>
            ))}

            {!isUserLogin ? (
              <button
                onClick={() => navigate("/auth/signin")}
                className="h-8 text-[16px] px-8 py-1 rounded-md bg-red-100 text-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 hover:text-white"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => navigate(RouteConstants.USERPROFILE.PROFILE)}
                className="p-2 text-white rounded-full bg-primary hover:bg-primary/70"
              >
                <FaUser />
              </button>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-white bg-gray-600 rounded-full hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </ul>
        </div>

        <div className="lg:hidden text-black dark:text-white">
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
            className="absolute left-0 right-0 z-40 w-full p-4 bg-white shadow-lg lg:hidden top-full dark:bg-gray-900"
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
                    className="block py-2 font-play hover:text-secondary dark:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}

              <div className="flex items-center justify-between">
                {!isUserLogin ? (
                  <button
                    onClick={() => {
                      navigate("/auth/signin");
                      setMobileMenuOpen(false);
                    }}
                    className="primary-btn"
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/profile"); toggleMobileMenu();
                    }}
                    className="w-10 p-3 text-center text-white rounded-full bg-primary hover:bg-primary/70"
                  >
                    <FaUser />
                  </button>
                )}

                {/* ✅ Add Dark Mode Toggle Here */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 ml-4 text-white bg-gray-600 rounded-full hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
              </div>
            </ul>

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





