import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "../components/Loader";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

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

const steps = ["Personal Info", "Academic Info", "Upload Resume"];

const InternshipForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    college: "",
    qualification: "",
    internshipType: "",
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [internships, setInternships] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateStep = () => {
    const stepErrors = {};
    if (step === 0) {
      if (!formData.name) stepErrors.name = "Name is required";
      if (!formData.email) stepErrors.email = "Email is required";
      if (!formData.mobile) stepErrors.mobile = "Phone is required";
    } else if (step === 1) {
      if (!formData.college) stepErrors.college = "College is required";
      if (!formData.qualification)
        stepErrors.qualification = "Qualification is required";
      if (!formData.internshipType)
        stepErrors.internshipType = "Program is required";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let resumeURL = "";
      if (formData.resume) {
        const storage = getStorage();
        const storageRef = ref(storage, `resumes/${formData.resume.name}`);
        await uploadBytes(storageRef, formData.resume);
        resumeURL = await getDownloadURL(storageRef);
      }
      const {
        name,
        email,
        mobile,
        college,
        qualification,
        internshipType,
      } = formData;
      await fetchLatestInternship();
      await addDoc(
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
      setStep(0);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="min-h-screen py-10 px-4 bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Internship & Training Application
        </h2>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((label, i) => (
            <div key={i} className="flex-1">
              <div
                className={`text-xs text-center py-2 px-1 rounded-full ${
                  i === step
                    ? "bg-red-500 text-white"
                    : i < step
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {label}
              </div>
              {i < steps.length - 1 && (
                <div className="h-1 bg-gray-300 w-full mx-auto"></div>
              )}
            </div>
          ))}
        </div>

        {isLoading ? (
          <Loader />
        ) : showPopup ? (
          <motion.div
            className="text-center p-6 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FaCheckCircle className="mx-auto text-green-500 text-4xl mb-2" />
            <h3 className="text-xl font-semibold">Application Submitted!</h3>
            <p className="text-gray-600">We'll contact you soon.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step1"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4"
                >
                  {["name", "email", "mobile"].map((field) => (
                    <div key={field}>
                      <input
                        type="text"
                        name={field}
                        placeholder={`Enter your ${field}`}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-300 outline-none"
                      />
                      {errors[field] && (
                        <p className="text-sm text-red-500">{errors[field]}</p>
                      )}
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step2"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4"
                >
                  <input
                    name="college"
                    placeholder="College / University"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-300 outline-none"
                  />
                  {errors.college && (
                    <p className="text-sm text-red-500">{errors.college}</p>
                  )}

                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded bg-white focus:ring-2 focus:ring-red-300 outline-none"
                  >
                    <option value="">Select Qualification</option>
                    <option value="Diploma">Diploma</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.qualification && (
                    <p className="text-sm text-red-500">
                      {errors.qualification}
                    </p>
                  )}

                  <select
                    name="internshipType"
                    value={formData.internshipType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded bg-white focus:ring-2 focus:ring-red-300 outline-none"
                  >
                    <option value="">Select Internship Program</option>
                    {internshipPrograms.map((prog, i) => (
                      <option key={i} value={prog}>
                        {prog}
                      </option>
                    ))}
                  </select>
                  {errors.internshipType && (
                    <p className="text-sm text-red-500">
                      {errors.internshipType}
                    </p>
                  )}

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-5 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step3"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4"
                >
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded bg-white focus:ring-2 focus:ring-red-300"
                  />

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Submit
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        )}
      </div>
    </section>
  );
};

export default InternshipForm;
