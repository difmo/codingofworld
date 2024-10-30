import React, { useEffect } from 'react';
import { FaMapMarkedAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ContactUs = () => {
  return (
    <main className="flex flex-col">
      {/* Breadcrumb Area */}
      <motion.section 
        className="relative bg-cover bg-no-repeat pt-40" 
        style={{ backgroundImage: "url('/src/assets/bg/breadcrumb_bg.jpg')" }} 
        variants={fadeInUp} 
        initial="hidden" 
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto py-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary">Contact With Us</h3>
            <nav className="breadcrumb mt-4"></nav>
          </div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <img src="/src/assets/img/breadcrumb_shape01.svg" alt="img" className="animate-bounce" />
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
        <div className="max-w container mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Left Contact Info */}
            <motion.div 
              className="lg:w-1/3"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white p-6 rounded-lg">
                <ul className="space-y-4">
                  <li className="flex items-start border p-6 bg-gray-100 rounded-md">
                    <FaMapMarkedAlt size={24} className="text-primary mr-3" />
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p>4/37 Vibhav Khand Gomti Nagar, Lucknow, Uttar Pradesh, 226010</p>
                    </div>
                  </li>
                  <li className="flex items-start border p-6 bg-gray-100 rounded-md">
                    <FaPhone size={24} className="text-primary mr-3" />
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <a href="tel:9455791624" className="text-blue-600">+91 945-579-1624</a>
                      <br />
                      <a href="tel:6387800143" className="text-blue-600">+91 638-780-0143</a>
                    </div>
                  </li>
                  <li className="flex items-start border p-6 bg-gray-100 rounded-md">
                    <FaEnvelope size={24} className="text-primary mr-3" />
                    <div>
                      <h4 className="font-semibold">E-mail Address</h4>
                      <a href="mailto:info@codeservir.com" className="text-blue-600">info@codeservir.com</a>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Contact Form */}
            <motion.div 
              className="lg:w-2/3 border p-6 bg-gray-50 rounded-md"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="p-6 rounded-lg">
                <h4 className="font-semibold">Send Us Message</h4>
                <p className="text-gray-500">Your email address will not be published. Required fields are marked *</p>
                <form id="contact-form" method="POST">
                  <div className="mb-4">
                    <textarea name="message" placeholder="Comment" required className="w-full p-3 border border-gray-300 rounded" />
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <input name="name" type="text" placeholder="Name *" required className="w-full p-3 border border-gray-300 rounded" />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <input name="email" type="email" placeholder="E-mail *" required className="w-full p-3 border border-gray-300 rounded" />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <input id="contact" name="contact" type="number" placeholder="Contact Number*" required className="w-full p-3 border border-gray-300 rounded" />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <select name="course" className="w-full p-3 border border-gray-300 rounded">
                        <option value="" disabled>--Select a Course--</option>
                        <option value="Summer Training">Summer Training</option>
                        <option value="Winter Training">Winter Training</option>
                        <option value="Apprenticeship Training">Apprenticeship Training</option>
                        <option value="Web Development Course">Web Development Course</option>
                        <option value="Programming Language">Programming Language</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Database">Database</option>
                        <option value="ASP.Net Development">ASP.Net Development</option>
                        <option value="PHP Development">PHP Development</option>
                        <option value="Python Development">Python Development</option>
                        <option value="Java Development">Java Development</option>
                        <option value="Frontend Development">Frontend Development</option>
                        <option value="WordPress Development">WordPress Development</option>
                        <option value="Pay Per Click">Pay Per Click</option>
                        <option value="SMM/SMO">SMM/SMO</option>
                        <option value="Search Engine Optimization">Search Engine Optimization</option>
                        <option value="C# Programming">C# Programming</option>
                        <option value="C++ Programming">C++ Programming</option>
                        <option value="Java Programming">Java Programming</option>
                        <option value="PHP Programming">PHP Programming</option>
                        <option value="Python Programming">Python Programming</option>
                        <option value="Graphics Design">Graphics Design</option>
                        <option value="Personality Development">Personality Development</option>
                        <option value="Video Editing">Video Editing</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="p-2 bg-primary text-white rounded hover:bg-red-300 transition">
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.3547764955974!2d81.01755507421916!3d26.86046716233602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be389340450d3%3A0xefe5d679c62b5a20!2sCodeServir%20Technologies!5e0!3m2!1sen!2sin!4v1724742973684!5m2!1sen!2sin" 
              className="w-full h-96 border-0" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
            />
          </motion.div>
          {/* Contact Map End */}
        </div>
      </motion.section>
      {/* Contact Area End */}
    </main>
  );
};

export default ContactUs;
