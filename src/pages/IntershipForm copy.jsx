import { useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import { FaUser, FaEnvelope, FaFileUpload, FaBriefcase, FaMobileAlt } from 'react-icons/fa';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firestore SDK
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage SDK

// Initialize Firebase Auth and Firestore (Make sure Firebase is initialized outside this component)
import { db } from '../firebase'; // Assuming firebase config is in this file

const internshipTypes = [
  "Summer Training",
  "Winter Training",
  "Apprenticeship Training",
  "Web Development Course",
  "Programming Language",
  "Digital Marketing",
  "Database",
  "ASP.Net Development",
  "PHP Development",
  "Python Development",
  "Java Development",
  "Frontend Development",
  "WordPress Development",
  "Pay Per Click",
  "SMM/SMO",
  "Search Engine Optimization",
  "C# Programming",
  "C++ Programming",
  "Java Programming",
  "PHP Programming",
  "Python Programming",
  "Graphics Design",
  "Personality Development"
];

const InternshipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    internshipType: '',
    resume: null, // Optional field
    resumeURL: '', // to store the URL of the uploaded resume
  });
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility
  const [isLoading, setIsLoading] = useState(false); // State to track form submission progress

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Form validation function
  const validateForm = () => {
    const { name, email, mobile, internshipType } = formData;
    if (!name || !email || !mobile || !internshipType) {
      setError('Please fill in all required fields.');
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    const mobilePattern = /^[0-9]{10}$/; // Assuming mobile should be a 10-digit number
    if (!mobilePattern.test(mobile)) {
      setError('Please enter a valid mobile number.');
      return false;
    }

    setError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Start loading state

    try {
      let resumeURL = '';

      // Only upload resume if it's provided
      if (formData.resume) {
        const storage = getStorage();
        const storageRef = ref(storage, `resumes/${formData.resume.name}`);
        const uploadTask = await uploadBytes(storageRef, formData.resume);

        // Get the download URL of the uploaded image
        resumeURL = await getDownloadURL(storageRef);
      }

      // Create a new document in Firestore "internships" collection
      const docRef = await addDoc(collection(db, 'internships'), {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        internshipType: formData.internshipType,
        resumeURL, // Store the URL of the uploaded resume (if provided)
        createdAt: new Date(),
      });

      console.log('Document written with ID: ', docRef.id);

      // Show success message (popup)
      setShowPopup(true);

      // Clear form after submission
      setFormData({
        name: '',
        email: '',
        mobile: '',
        internshipType: '',
        resume: null,
        resumeURL: '',
      });
    } catch (e) {
      setError('Error adding document: ' + e.message);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  // Close the popup modal
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className="pt-4 mx-auto md:w-1/2 md:p-4">
      <motion.h2
        className="mb-4 text-2xl font-bold text-center md:text-4xl md:pb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Apply for an Internship
      </motion.h2>

      {error && (
        <div className="mb-4 text-center text-red-500">
          <strong>{error}</strong>
        </div>
      )}

      {/* Show Loading/Progress Screen while submitting */}
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h3 className="text-xl">Uploading...</h3>
            <div className="mt-4 spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-11/12 p-6 text-center bg-white rounded-lg shadow-lg md:w-1/3">
                <h3 className="mb-4 text-2xl font-bold">Application Submitted!</h3>
                <p className="mb-4">We’ll connect with you soon!</p>
                <button
                  onClick={closePopup}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Form for submission */}
          <motion.form
            onSubmit={handleSubmit}
            className="p-6 bg-white border rounded-lg shadow-lg md:p-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Name Field */}
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

            {/* Email Field */}
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

            {/* Mobile Field */}
            <div className="mb-4">
              <label className="block text-gray-700">Mobile Number</label>
              <div className="flex items-center border border-gray-300 rounded">
                <FaMobileAlt className="ml-2" />
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full p-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Internship Type Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700">Select Internship Type</label>
              <div className="relative">
                <select
                  name="internshipType"
                  value={formData.internshipType}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pr-10 border border-gray-300 rounded appearance-none"
                >
                  <option value="">--Select an Internship--</option>
                  {internshipTypes.map((internship, index) => (
                    <option key={index} value={internship}>
                      {internship}
                    </option>
                  ))}
                </select>
                <FaBriefcase className="absolute pointer-events-none right-3 top-3" />
              </div>
            </div>

            {/* Resume Upload */}
            <div className="mb-4">
              <label className="block text-gray-700">Upload Resume (Optional)</label>
              <div className="flex items-center border border-gray-300 rounded">
                <FaFileUpload className="ml-2" />
                <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full p-2 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-2 text-white transition rounded bg-primary hover:bg-primary/70"
            >
              Submit Application
            </button>
          </motion.form>
        </>
      )}
    </section>
  );
};

export default InternshipForm;
