import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Footer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email } = formData;
    const newErrors = {};
    if (!email) newErrors.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Enter a valid email.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { email } = formData;
      await addDoc(collection(db, "subscriptions"), {
        email,
        createdAt: new Date(),
      });

      setShowPopup(true);
      setFormData({ email: "" });
      setErrors({});
    } catch (error) {
      console.error("Error adding document:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <footer className="pt-28 bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
          {/* First Section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold text-secondaryblue">Coding Of <span className="text-primary">World</span> Institute</h1>
            <p className="text-dark2">
              Offers students hands-on training and career guidance in web
              development, mobile apps, AI/ML, and robotics to launch successful
              tech careers.
            </p>
          </div>

          {/* Second Section */}
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <h1 className="text-2xl text-secondaryblue font-bold">Courses</h1>
              <ul className="space-y-2 text-lg text-dark2">
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/courses")}
                >
                  App Development
                </li>
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/courses")}
                >
                  Web Development
                </li>
                <li
                  className="duration-200 cursor-pointer hover:text-secondary"
                  onClick={() => navigate("/courses")}
                >
                  DSA(Logic Building)
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl text-secondaryblue font-bold">Links</h1>
              <ul className="space-y-2 text-lg text-dark2">
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
            <h1 className="text-2xl text-secondaryblue font-bold">Get In Touch</h1>
            

            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 py-4 bg-white rounded-s-xl focus:ring-0 focus:outline-none placeholder:text-dark2"
              />
              <button
                type="submit"
                className="px-6 py-4 font-semibold text-white bg-primary rounded-e-xl"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Subscribe"}
              </button>
            </form>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

            {/* Social Icons */}
            <div className="flex py-1 space-x-6">
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
            </div>
          </div>
        </div>
      </motion.div>
      <hr className="bg-gray-200 h-[2px] mt-5 w-full" />
      <div className="flex items-center justify-center py-3 text-dark2">
        © 2024 Coding of World. All Rights Reserved.
      </div>

      {showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
    <motion.div
      className="max-w-md p-8 mx-auto space-y-6 text-center bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <motion.h3
        className="text-2xl font-bold text-green-600"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Subscription Successful!
      </motion.h3>

      <motion.p
        className="text-gray-600"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Thank you for subscribing! You’ll now receive the latest updates and
        exclusive content from us.
      </motion.p>

      <motion.button
        onClick={() => setShowPopup(false)}
        className="px-5 py-2 mt-4 text-white transition bg-red-500 rounded-full shadow-md hover:bg-red-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Close
      </motion.button>
    </motion.div>
  </div>
)}

    </footer>
  );
};

export default Footer;
