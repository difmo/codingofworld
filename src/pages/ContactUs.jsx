import React, { useState } from "react";
import {
  FaMapMarkedAlt,
  FaPhone,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    course: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Contact number validation
    if (!formData.contact || formData.contact.length < 10) {
      newErrors.contact = "Please enter a valid contact number";
      isValid = false;
    }

    // Course validation
    if (!formData.course) {
      newErrors.course = "Please select a course";
      isValid = false;
    }

    // Message validation
    if (!formData.message) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "contacts"), formData);
      setSuccessMessage("Your message has been sent successfully!"); // Set success message
      setFormData({
        name: "",
        email: "",
        contact: "",
        message: "",
        course: "",
      });
    } catch (error) {
      setSuccessMessage(""); // Clear success message on error
      setErrors({
        ...errors,
        general: "An error occurred. Please try again later.",
      }); // Optional: Add general error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col bg-gray-100">
      {/* Breadcrumb Area */}
      <motion.section
        className="relative pt-12 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url(/path/to/hero-image.jpg)' }}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 "></div>
        <div className="relative z-10 py-12 mx-auto text-center text-black">
          <h2 className="text-4xl font-extrabold text-primary">Get In Touch</h2>
          <p className="px-8 mt-4 text-lg">We are here to assist you. Feel free to reach out!</p>
        </div>
      </motion.section>

      {/* Contact Info Section */}
      <motion.section
        className="py-12"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container flex flex-col gap-8 mx-auto lg:flex-row">
          {/* Left Contact Info */}
          <motion.div
            className="p-8 bg-white rounded-lg shadow-md lg:w-1/3"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="mb-6 text-xl font-semibold">Our Contact Information</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <FaMapMarkedAlt size={24} className="text-primary" />
                <div>
                  <h5 className="font-semibold">Address</h5>
                  <p>4/37 Vibhav Khand Gomti Nagar, Lucknow, Uttar Pradesh, 226010</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <FaPhoneAlt size={24} className="text-primary" />
                <div>
                  <h5 className="font-semibold">Phone</h5>
                  <a href="tel:9455791624" className="text-blue-600">
                    +91 9455791624
                  </a>
                  <br />
                  <a href="tel:6387800143" className="text-blue-600">
                    +91 7800730968
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <FaEnvelope size={24} className="text-primary" />
                <div>
                  <h5 className="font-semibold">Email</h5>
                  <a href="mailto:codingofworld@gmail.com" className="text-blue-600">
                    codingofworld@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="p-8 bg-white rounded-lg shadow-md lg:w-2/3"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="mb-4 text-xl font-semibold">Send Us A Message</h4>
            <form onSubmit={handleSubmit} id="contact-form" method="POST">
              <div className="mb-4">
                <textarea
                  name="message"
                  placeholder="Comment"
                  className="w-full p-3 border border-gray-300 rounded"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <span className="text-sm text-red-500">
                    {errors.message}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2 mb-4 md:w-1/2">
                  <input
                    name="name"
                    type="text"
                    placeholder="Name *"
                    className="w-full p-3 border border-gray-300 rounded"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="w-full px-2 mb-4 md:w-1/2">
                  <input
                    name="email"
                    type="email"
                    placeholder="E-mail *"
                    className="w-full p-3 border border-gray-300 rounded"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="w-full px-2 mb-4 md:w-1/2">
                  <input
                    name="contact"
                    type="number"
                    placeholder="Contact Number*"
                    className="w-full p-3 border border-gray-300 rounded"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                  {errors.contact && (
                    <span className="text-sm text-red-500">
                      {errors.contact}
                    </span>
                  )}
                </div>
                <div className="w-full px-2 mb-4 md:w-1/2">
                  <select
                    name="course"
                    className="w-full p-3 border border-gray-300 rounded"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      --Select a Course--
                    </option>
                    <option value="Summer Training">Summer Training</option>
                    <option value="Winter Training">Winter Training</option>
                    <option value="Apprenticeship Training">
                      Apprenticeship Training
                    </option>
                    <option value="Web Development Course">
                      Web Development Course
                    </option>
                    <option value="Programming Language">
                      Programming Language
                    </option>
                  </select>
                  {errors.course && (
                    <span className="text-sm text-red-500">
                      {errors.course}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white rounded-lg bg-primary hover:bg-red-500"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Send Message"}
              </button>
            </form>
            {successMessage && (
              <div className="mt-4 text-green-500">
                {successMessage}
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Area */}
      <motion.section
        className=""
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Contact Map */}

        <div className="container mx-auto lg:flex-row">
        <motion.div
           className="p-1 bg-white rounded-lg shadow-md"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3559.356030973117!2d81.0200936760605!3d26.86042729034375!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x921922aa4e79ddd%3A0x54e478f227f46594!2sDifmo%20Technologies!5e0!3m2!1sen!2sin!4v1731411549734!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default ContactUs;
