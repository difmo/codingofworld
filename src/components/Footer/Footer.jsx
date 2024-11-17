import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaGit,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="py-28 bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-4">
          {/* First Section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">The Coding World Institute</h1>
            <p className="text-dark2">
              Offers students hands-on training and career guidance in web
              development, mobile apps, AI/ML, and robotics to launch successful
              tech careers.
            </p>
          </div>

          {/* Second Section */}
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Courses</h1>
              <ul className="space-y-2 text-lg text-dark2">
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/coursepage")}
                >
                  React Development
                </li>
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/coursepage")}
                >
                  Mern Development
                </li>
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/coursepage")}
                >
                  App Development
                </li>
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/coursepage")}
                >
                  DSA
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Links</h1>
              <ul className="space-y-2 text-lg text-dark2">
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/")}
                >
                  Home
                </li>
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/courses")}
                >
                  Our Courses
                </li>
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/about")}
                >
                  About
                </li>
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/contactus")}
                >
                  Contact
                </li>
              </ul>
            </div>
          </div>

          {/* Third Section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">Get In Touch</h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full p-3 py-4 bg-white rounded-s-xl focus:ring-0 focus:outline-none placeholder:text-dark2"
              />
              <button className="px-6 py-4 font-semibold text-white bg-primary rounded-e-xl">
                Go
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex py-3 space-x-6">
              <a
                href="https://chat.whatsapp.com/FwZdLFOAPIZDf5xCmvt7RO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="duration-200 cursor-pointer hover:text-primary hover:scale-105" />
              </a>
              <a
                href="https://www.instagram.com/thedifmo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="duration-200 cursor-pointer hover:text-primary hover:scale-105" />
              </a>
              <a
                href="https://difmo-sigma.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TbWorldWww className="duration-200 cursor-pointer hover:text-primary hover:scale-105" />
              </a>
              <a
                href="https://www.linkedin.com/company/difmo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="duration-200 cursor-pointer hover:text-primary hover:scale-105" />
              </a>
              <a
                href="https://x.com/difmotech"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="duration-200 cursor-pointer hover:text-primary hover:scale-105" />
              </a>
              <a
                href="https://www.youtube.com/@thedifmo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="duration-200 cursor-pointer hover:text-primary hover:scale-105" />
              </a>
              <a
                href="https://www.facebook.com/difmotech"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="duration-200 cursor-pointer hover:text-primary hover:scale-105" />
              </a>
              <a
                href="https://github.com/difmo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGit className="duration-200 cursor-pointer hover:text-primary hover:scale-105" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
