import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { db } from "../../firebase"; 
import { collection, addDoc } from "firebase/firestore"; 
import image from "../Events/eventbg.svg"; 
import Loader from "../Loader";

const EventForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const [success, setSuccess] = useState(false); 

  const modalRef = useRef(null);

  const validateForm = () => {
    if (!name || !email || !mobileNumber || !collegeName) {
      setError("Please fill all fields carefully");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); 

    if (validateForm()) {
      setLoading(true); 

      try {
        console.log("Adding document to Firestore..."); 
        await addDoc(collection(db, "event", "democlass", "registrations"), {
          name,
          email,
          mobileNumber,
          collegeName,
          createdAt: new Date(),
        });

        console.log("Document added successfully!"); 

       
        setSuccess(true); 
        setLoading(false);

        console.log("Success state updated."); 
      } catch (error) {
        console.error("Error adding document: ", error);
        setLoading(false); 
        setError("An error occurred. Please try again later.");
      }
    }
  };

  // Close modal if clicked outside
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef} 
        className="relative w-full max-w-lg p-8 overflow-hidden rounded-lg bg-primary animate-popup"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={onClose}
          className="absolute text-2xl text-white top-16 right-12"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col justify-center p-8 bg-opacity-75 rounded-lg ">
          <h2 className="mb-4 text-2xl font-bold text-center text-white">
            Register For Your Demo Classes
          </h2>
          {error && <div className="mb-4 text-center text-white">{error}</div>}

          {loading && <Loader />}

          {/* Success Message */}
          {success && !loading && (
            <div>
              <div className="flex items-center justify-center px-4 py-4 mb-6 space-x-4 text-center text-white">
                {/* Success Message */}
                <p className="text-xl font-semibold">
                  🎉 Success! You've successfully registered for our Demo Class.
                  Our team will get in touch with you shortly to help you get
                  started. Stay tuned!
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={onClose} 
                  className="px-6 py-2 text-lg font-semibold transition-all bg-white border-2 rounded-3xl text-primary border-primary hover:bg-primary hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {!loading && !success && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 text-black bg-white rounded-sm outline-none"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 text-black bg-white rounded-sm outline-none"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-white">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full p-2 text-black bg-white rounded-sm outline-none"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="collegeName" className="block text-white">
                  College Name
                </label>
                <input
                  type="text"
                  id="collegeName"
                  placeholder="College Name"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full p-2 text-black bg-white rounded-sm outline-none"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full p-3 text-white transition border rounded-lg border-primary bg-primary hover:bg-primary"
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-popup {
          animation: popup 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default EventForm;
