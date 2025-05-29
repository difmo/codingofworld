import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaCheckCircle, FaGraduationCap, FaLaptopCode } from "react-icons/fa";
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
import CustomInput from "@/components/InputAndButton/CustomInput";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import CustomSelect from "@/components/InputAndButton/CustomSelect";
import { getFormSteps, getInternshipPrograms } from "@/utils/Constants";

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
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Added state for confirmation popup
  const internshipPrograms = getInternshipPrograms();
  const steps = getFormSteps();
  

useEffect(() => {
  fetchLatestInternship();
}, []); 
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
  
  try {
    const querySnapshot = await getDocs(q);

    console.log('Query Snapshot:', querySnapshot);  // Log the result

    if (!querySnapshot.empty) {
      const latestDoc = {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data(),
      };
      setInternships([latestDoc]);
    } else {
      console.log("No documents found.");
      setInternships([]); // Clear internships if no data is found
    }
  } catch (error) {
    console.error("Error fetching internship data:", error);
  }
};

useEffect(() => {
  fetchLatestInternship();
}, []);  // Run once when the component mounts


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (internships.length === 0) {
      alert("No internship found. Please try again later.");
      return;
    }

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
      await addDoc(
        collection(db, "allinternships", internships[0].title, "internships"),
        {
          name,
          email,
          mobile,
          college,
          qualification,
          internshipType,
          resumeURL, // will be null if no resume uploaded
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

  const handleConfirmSubmit = () => {
    setShowConfirmPopup(false); // Close confirmation popup
    handleSubmit(new Event("submit")); // Trigger form submission
  };

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-2xl mx-auto  p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Internship & Training Application
        </h2>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 relative">
          {steps.map((label, i) => (
            <div key={i} className="relative flex-1 text-center z-10">
              <div
                className={`text-xs py-2 px-4 ml-2 rounded-full mx-auto w-fit ${i === step
                  ? "bg-red-500 text-white"
                  : i < step
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                  }`}
              >
                {label}
              </div>
            </div>
          ))}

          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>
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
          <form onSubmit={(e) => { setShowConfirmPopup(true); e.preventDefault(); }} className="space-y-6">
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
                  {[
                    { name: "name", icon: FaUser },
                    { name: "email", icon: FaEnvelope },
                    { name: "mobile", icon: FaPhone },
                  ].map(({ name, icon }) => (
                    <div key={name}>
                      <CustomInput
                        type="text"
                        name={name}
                        placeholder={`Enter your ${name}`}
                        value={formData[name]}
                        onChange={handleChange}
                        icon={icon}
                        error={errors[name]}
                      />
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
                  <CustomInput
                    name="college"
                    placeholder="College / University"
                    value={formData.college}
                    onChange={handleChange}
                    icon={FaBook}
                    error={errors.college}
                  />

                  <CustomSelect
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    options={["Diploma", "B.Tech", "Others"]}
                    placeholder="Select Qualification"
                    icon={FaGraduationCap}
                    error={errors.qualification}
                  />
                  <CustomSelect
                    name="internshipType"
                    value={formData.internshipType}
                    onChange={handleChange}
                    options={internshipPrograms}
                    placeholder="Select Internship Program"
                    icon={FaLaptopCode}
                    error={errors.internshipType}
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
                  <p className="text-xs text-gray-500">Resume is optional</p>

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
                      onClick={() => setShowConfirmPopup(true)}
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

        {/* Confirmation Popup */}
        {showConfirmPopup && (
          <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Are you sure you want to submit?</h3>
              <h3 className="text-sm font-semibold mb-4">Check all details.</h3>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowConfirmPopup(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InternshipForm;
