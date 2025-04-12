import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../../../features/users/userSlice";
import Loader from "@/components/Loader";

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const { data: user, loading } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    graduationYear: "",
    cgpa: "",
    projectTitle: "",
    projectDescription: "",
    skills: "",
    github: "",
    leetcode: "",
    gfg: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    alert("Profile updated successfully!");
  };

  const renderInput = (label, name, type = "text", full = false) => (
    <div className={`${full ? "w-full" : "w-full md:w-1/2"} px-2 mb-4`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={`Enter ${label}`}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />  
    </div>
  );

  if (loading || !user) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
         <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md transition-all duration-300">
      <div className="flex justify-between mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 mx-1 rounded-full ${
              step >= s ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold text-center mb-6 text-primary dark:text-primary">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2">
          {step === 1 && (
            <>
              {renderInput("Full Name", "name")}
              {renderInput("Email", "email", "email")}
              {renderInput("Phone Number", "phone", "tel")}
            </>
          )}

          {step === 2 && (
            <>  
              {renderInput("College Name", "college")}
              {renderInput("Branch", "branch")}
              {renderInput("Graduation Year", "graduationYear")}
              {renderInput("CGPA", "cgpa")}
            </>
          )}

          {step === 3 && (
            <>
              {renderInput("Project Title", "projectTitle")}
              <div className="w-full px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Project Description</label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your project"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              {renderInput("Skills (e.g. React, Node.js)", "skills", "text", true)}
              {renderInput("GitHub Profile URL", "github", "url")}
              {renderInput("LeetCode Profile URL", "leetcode", "url")}
              {renderInput("GeeksforGeeks Profile URL", "gfg", "url")}
            </>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-md"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-6 py-2 bg-primary hover:bg-primary text-white font-medium rounded-md"
            >
              Save & Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
    </div>
 
  );
};

export default EditProfileForm;
