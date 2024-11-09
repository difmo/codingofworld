import React, { useEffect } from "react";
import { FaMapMarkedAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ContactUs = () => {

  return (
    <main className="flex flex-col">
      {/* Breadcrumb Area */}
      <motion.section
        className="relative pt-4 bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/src/assets/bg/breadcrumb_bg.jpg')" }}
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
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <img src="/src/assets/img/breadcrumb_shape01.svg" alt="img" className="animate-bounce" /> */}
        </div>
      </motion.section>
      {/* Breadcrumb Area End */}

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
                    <FaPhone size={24} className="mr-3 text-primary" />
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <a href="tel:9455791624" className="text-blue-600">
                        +91 945-579-1624
                      </a>
                      <br />
                      <a href="tel:6387800143" className="text-blue-600">
                        +91 638-780-0143
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start p-6 bg-gray-100 border rounded-md">
                    <FaEnvelope size={24} className="mr-3 text-primary" />
                    <div>
                      <h4 className="font-semibold">E-mail Address</h4>
                      <a
                        href="mailto:info@codeservir.com"
                        className="text-blue-600"
                      >
                        info@codeservir.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
            {/* right */}
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
                <form id="contact-form" method="POST">
                  <div className="mb-4">
                    <textarea
                      name="message"
                      placeholder="Comment"
                      required
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full px-2 mb-4 md:w-1/2">
                      <input
                        name="name"
                        type="text"
                        placeholder="Name *"
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="w-full px-2 mb-4 md:w-1/2">
                      <input
                        name="email"
                        type="email"
                        placeholder="E-mail *"
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="w-full px-2 mb-4 md:w-1/2">
                      <input
                        name="contact"
                        type="number"
                        placeholder="Contact Number*"
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="w-full px-2 mb-4 md:w-1/2">
                      <select
                        name="course"
                        value={formData.course} // Bind to state
                        onChange={postUserData} // Update state on change
                        className="w-full p-3 border border-gray-300 rounded"
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
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="p-2 text-white transition rounded bg-primary hover:bg-red-300"
                  >
                    Submit Now
                  </button>
                </form>
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
          {/* Contact Map End */}
        </div>
      </motion.section>
    </main>
  );
};

export default ContactUs;
