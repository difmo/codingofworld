import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Firestore SDK
import { db } from "../firebase";
import blog from "../assets/blog.jpg";
const Popupbloge = () => {
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

  // Define the form fields
  const fields = [
    { id: "name", label: "Name", type: "text" },
    { id: "phone", label: "Phone Number", type: "text" },
    { id: "email", label: "Email Address", type: "email" },
    { id: "title", label: "Title", type: "text" },
    { id: "address", label: "Address", type: "text" },
  ];

  // Handle input changes
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

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Bloger Contact
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 my-10 mx-4">
        <div>
          <img src={blog} />
        </div>
        <div className="  p-4 bg-white shadow-lg rounded-lg">
          <form onSubmit={handleSubmit}>
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
                  <p className="text-red-600 text-sm">{errors[field.id]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
          {showPopup && (
            <div className="mb-4 text-center text-green-500">
              <p>Your form has been submitted successfully!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Popupbloge;
