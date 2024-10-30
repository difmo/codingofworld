import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Our Courses", path: "/courses" },
  { id: 3, title: "About Us", path: "/about" },
  { id: 4, title: "Our Training Team", path: "/trainingteam" },
  { id: 5, title: "Contact Us", path: "/contactus" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-10 flex justify-between items-center absolute"
      >
        {/* Logo section */}
        <div>
          <h1 className="font-bold text-2xl">The Coding of <span className="text-primary">World</span></h1>
        </div>

        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path} // Use Link instead of a tag
                  className="inline-block py-2 px-3 hover:text-secondary relative group"
                >
                  <div className="w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                  {menu.title}
                </Link>
              </li>
            ))}
            <button className="primary-btn">Sign In</button>
          </ul>
        </div>

        <div className="lg:hidden">
          <IoMdMenu className="text-4xl cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white shadow-lg absolute z-40 top-full left-0 right-0 mt-2 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-2">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <Link
                    to={menu.path} // Use Link instead of a tag
                    className="block py-2 hover:text-secondary"
                    onClick={() => setMobileMenuOpen(false)} // Close menu on item click
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
              <button className="primary-btn">Sign In</button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
