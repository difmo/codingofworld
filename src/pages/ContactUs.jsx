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

  const [successMessage, setSuccessMessage] = useState(""); 

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
    <main className="flex flex-col">
      {/* Breadcrumb Area */}
      <motion.section
        className="relative pt-4 bg-no-repeat bg-cover"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        <div className="py-12 mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary">Contact With Us</h3>
            <nav className="mt-4 breadcrumb"></nav>
          </div>
        </div>
      </motion.section>

      {/* Contact Area */}
      <motion.section
        className="py-24"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto max-w">
          <div className="flex flex-col lg:flex-row">
            {/* Left Contact Info */}
            <motion.div
              className="lg:w-1/3"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="p-6 bg-white rounded-lg">
                <ul className="space-y-4">
                  <li className="flex items-start p-6 bg-gray-100 border rounded-md">
                    <FaMapMarkedAlt size={24} className="mr-3 text-primary" />
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p>
                        4/37 Vibhav Khand Gomti Nagar, Lucknow, Uttar Pradesh,
                        226010
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start p-6 bg-gray-100 border rounded-md">
                    <FaPhoneAlt size={24} className="mr-3 text-primary" />
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <a href="tel:9455791624" className="text-blue-600">
                        +91 945-579-1624
                      </a>
                      <br />
                      <a href="tel:6387800143" className="text-blue-600">
                        +91 780-0730-968
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start p-6 bg-gray-100 border rounded-md">
                    <FaEnvelope size={24} className="mr-3 text-primary" />
                    <div>
                      <h4 className="font-semibold">E-mail Address</h4>
                      <a href="mailto:info@difmo.com" className="text-blue-600">
                        info@codeservir.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Contact Form */}
            <motion.div
              className="p-6 border rounded-md lg:w-2/3 bg-gray-50"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="p-6 rounded-lg">
                <h4 className="font-semibold">Send Us Message</h4>
                <p className="text-gray-500">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
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
                    className="p-2 text-white transition rounded bg-primary hover:bg-red-300"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Now"}
                  </button>
                </form>

                {/* Success Message */}
                {successMessage && (
                  <div className="mt-6 font-semibold text-center text-green-500">
                    {successMessage}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Contact Map */}
          <motion.div
            className="mt-12"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              className="w-full border-0 h-96"
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
