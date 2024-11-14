import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { FaTimes } from "react-icons/fa"; // Import the cross icon

const Popupbloge = ({ setPopUpOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    title: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    title: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const fields = [
    { id: "name", label: "Name", type: "text" },
    { id: "phone", label: "Phone Number", type: "text" },
    { id: "email", label: "Email Address", type: "email" },
    { id: "title", label: "Title", type: "text" },
    { id: "address", label: "Address", type: "text" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", phone: "", email: "", title: "", address: "" };

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10 digits)";
      valid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!formData.title) {
      newErrors.title = "Title is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const { name, email, phone, title, address } = formData;

      // Create a new document in the "blogeform" collection in Firestore
      const docRef = await addDoc(collection(db, "blogeform"), {
        name,
        email,
        phone,
        title,
        address,
        createdAt: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);

      // Show success popup and reset the form
      setShowPopup(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        title: "",
        address: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={closePopup} // Close the popup when clicking outside
        >
          <div
            className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner form click
          >
            <button
              onClick={closePopup} // Close the popup when clicking the cross
              className="absolute p-2 text-gray-600 top-2 right-2 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
            <form onSubmit={handleSubmit}>
              <h2 className="mb-4 text-xl font-semibold text-center">
                Submit Your Blog Details
              </h2>
              {fields.map((field) => (
                <div key={field.id} className="mb-4">
                  <label htmlFor={field.id} className="block text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  {errors[field.id] && (
                    <p className="text-sm text-red-600">{errors[field.id]}</p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>

            {showPopup && (
              <div className="mt-4 text-center text-green-500">
                <p>Your form has been submitted successfully!</p>
                <button
                  onClick={closePopup}
                  className="px-4 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Popupbloge;
