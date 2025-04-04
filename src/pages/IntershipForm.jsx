import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaMobileAlt,
  FaMapMarkerAlt,
  FaFileUpload,
} from "react-icons/fa";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore"; // Firestore SDK
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage SDK

import { db } from "../firebase";
import Loader from "../components/Loader";

const internshipPrograms = [
  "Mobile App Development",
  "Web App Development",
  "Apprenticeship Training",
  "Summer Training",
  "Winter Training",
  "Digital Marketing",
  "ASP.Net Development",
  "PHP Development",
  "Python Development",
  "Java Development",
  "Frontend Development",
  "WordPress Development",
  "Search Engine Optimization",
  "C# Programming",
  "C++ Programming",
  "Java Programming",
  "PHP Programming",
  "Python Programming",
  "Graphics Design",
];

const InternshipForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    college: "",
    qualification: "",
    internshipType: "",
    resume: null,
    resumeURL: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [internships, setInternships] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const { name, email, mobile, college, qualification, internshipType } =
      formData;
    const newErrors = {};
    if (!name) newErrors.name = "Please enter your name";
    if (!email) newErrors.email = "Please enter your email";
    if (!mobile) newErrors.mobile = "Please enter your phone number";
    if (!college)
      newErrors.college = "Please enter your college or university name ";
    if (!qualification)
      newErrors.qualification = "Please select your qualification";
    if (!internshipType)
      newErrors.internshipType = "Please select your internship program";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchLatestInternship = async () => {
    const q = query(
      collection(db, "admin"),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const latestDoc = {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data(),
      };
      setInternships([latestDoc]);
      console.log(internships);
    } else {
      console.log("No documents found");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      let resumeURL = "";
      if (formData.resume) {
        const storage = getStorage();
        const storageRef = ref(storage, `resumes/${formData.resume.name}`);
        await uploadBytes(storageRef, formData.resume);
        resumeURL = await getDownloadURL(storageRef);
      }

      // Destructure only necessary fields from formData, excluding resume
      const { name, email, mobile, college, qualification, internshipType } =
        formData;

      // Create a new document in Firestore "internships" collection
      await fetchLatestInternship();
      const docRef = await addDoc(
        collection(db, "allinternships", internships[0].title, "internships"),
        {
          name,
          email,
          mobile,
          college,
          qualification,
          internshipType,
          resumeURL,
          createdAt: new Date(),
        }
      );

      console.log("Document written with ID: ", docRef.id);

      setShowPopup(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        college: "",
        qualification: "",
        internshipType: "",
        resume: null,
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-8 mx-auto md:w-2/3 lg:w-1/2">
      <motion.h2
        className="mb-8 text-3xl font-semibold text-center text-red-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Apply for <span className="text-red-600">Internship & Training</span>
      </motion.h2>

      {isLoading ? (
        <Loader />
      ) : (
        <>
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
                  Application Submitted Successfully!
                </motion.h3>

                <motion.p
                  className="text-gray-600"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Thank you for applying! We’ll connect with you soon.
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

          <motion.form
            onSubmit={handleSubmit}
            className="p-8 space-y-6 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[
              {
                label: "Full Name",
                name: "name",
                type: "text",
                error: errors.name,
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                error: errors.email,
              },
              {
                label: "Phone",
                name: "mobile",
                type: "text",
                error: errors.mobile,
              },
              {
                label: "College / University",
                name: "college",
                type: "text",
                error: errors.college,
              },
            ].map(({ label, name, type, error }, idx) => (
              <div key={idx} className="space-y-1">
                <label className="font-medium">
                  {label}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            ))}

            <div className="space-y-1">
              <label className="font-medium">
                Qualification<span className="text-red-500">*</span>
              </label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded appearance-none focus:outline-none"
              >
                <option value="">Select an option</option>
                <option value="Diploma">Diploma</option>
                <option value="B.Tech">B.Tech</option>
                <option value="Others">Others</option>
              </select>
              {errors.qualification && (
                <p className="text-sm text-red-500">{errors.qualification}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="font-medium">
                Select Program<span className="text-red-500">*</span>
              </label>
              <select
                name="internshipType"
                value={formData.internshipType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded appearance-none focus:outline-none"
              >
                <option value="">Select</option>
                {internshipPrograms.map((prog, idx) => (
                  <option key={idx} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
              {errors.internshipType && (
                <p className="text-sm text-red-500">{errors.internshipType}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="font-medium">Resume</label>
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                accept="application/pdf, application/msword, image/*"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
            >
              Register
            </button>
          </motion.form>
        </>
      )}
    </section>
  );
};

export default InternshipForm;
