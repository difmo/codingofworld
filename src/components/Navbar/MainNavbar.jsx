import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "firebase/auth";
import { db, auth } from "../../firebase";

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
  const navigate = useNavigate();
  const [isUserLogin, setisUserLogin] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setisUserLogin(user);
        console.log("User is logged in:", user);
      } else {
        setisUserLogin(null);
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
  return (
    <nav className="sticky top-0 z-20 w-full bg-white shadow-sm">
   
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container flex items-center justify-between py-5 mx-auto" // Centered container
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
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUayJgE_3bVA9uuIqClGEY78uGzfCwWWCQ5yL9tm_OdR-mn1Hv2o5qkSiQOUfmqGhMZg&usqp=CAU"
                alt=""
                className="object-cover w-10 h-10 rounded-full"
                onClick={() => navigate("/UserDetails")}
              />
            )}
          </ul>
        </div>

        <div className="lg:hidden">
          <IoMdMenu
            className="text-4xl cursor-pointer"
            onClick={toggleMobileMenu}
          />
        </div>
      </motion.div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute left-0 right-0 z-40 w-full p-4 mt-2 bg-white shadow-lg lg:hidden top-full" // Full width for mobile menu
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
    </nav>
  );
};

export default MainNavbar;
