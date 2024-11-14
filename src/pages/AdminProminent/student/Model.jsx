// Modal.js
import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ showModal, closeModal, children }) => {
  if (!showModal) return null; // Don't render the modal if showModal is false

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="p-6 bg-white rounded-lg w-96">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Edit Student</h3>
          <button onClick={closeModal} className="text-xl text-gray-500">
            <FaTimes />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
