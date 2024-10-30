import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import { FaUser, FaEnvelope, FaFileUpload, FaBriefcase, FaMobileAlt, FaLaptopCode, FaDatabase } from 'react-icons/fa';

// Define internship types with icons
const internshipTypes = [
  {
    title: 'App Development',
    icon: <FaMobileAlt className="w-16 h-16 mb-2" />,
  },
  {
    title: 'Mobile Development',
    icon: <FaMobileAlt className="w-16 h-16 mb-2" />,
  },
  {
    title: 'Web Development',
    icon: <FaLaptopCode className="w-16 h-16 mb-2" />,
  },
  {
    title: 'Data Science',
    icon: <FaDatabase className="w-16 h-16 mb-2" />,
  },
  // Add more internship types as needed...
];

const InternshipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    internshipType: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <section className="container mx-auto p-40">
      <motion.h2
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Apply for an Internship
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg p-8"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <div className="flex items-center border border-gray-300 rounded">
            <FaUser className="ml-2" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <div className="flex items-center border border-gray-300 rounded">
            <FaEnvelope className="ml-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select Internship Type</label>
          <div className="relative">
            <select
              name="internshipType"
              value={formData.internshipType}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded appearance-none pr-10"
            >
              <option value="">--Select an Internship--</option>
              {internshipTypes.map((internship, index) => (
                <option key={index} value={internship.title}>
                  {internship.title}
                </option>
              ))}
            </select>
            <FaBriefcase className="absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload Resume</label>
          <div className="flex items-center border border-gray-300 rounded">
            <FaFileUpload className="ml-2" />
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf, .doc, .docx"
              required
              className="w-full p-2 focus:outline-none"
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-primary/70 transition">
          Submit Application
        </button>
      </motion.form>

      <motion.div
        className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {internshipTypes.map((internship, index) => (
          <div key={index} className="flex flex-col text-primary items-center">
            {internship.icon}
            <span className="text-center text-black">{internship.title}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default InternshipForm;
