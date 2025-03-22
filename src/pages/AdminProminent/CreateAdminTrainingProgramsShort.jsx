import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Import your Firebase config
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"; // Firestore functions

const CreateAdminTrainingPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [editedProgram, setEditedProgram] = useState(null);
  const [newDetails, setNewDetails] = useState({
    title: "",
    duration: "",
    price: "",
    description: "",
    link: ""
  });
  const [showModal, setShowModal] = useState(false);

  // Fetch Training Program Data from Firestore
  useEffect(() => {
    const fetchPrograms = async () => {
      const querySnapshot = await getDocs(collection(db, "trainingPrograms"));
      const programsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPrograms(programsData);
    };
    fetchPrograms();
  }, []);

  // Handle Editing a Training Program
  const handleEdit = (program) => {
    setEditedProgram(program);
    setNewDetails({
      title: program.title,
      duration: program.duration,
      price: program.price,
      description: program.description,
      link: program.link
    });
    setShowModal(true);
  };

  // Handle Input Change for Form (Edit or Add)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle Form Submission for Updating Training Program
  const handleUpdate = async () => {
    const programRef = doc(db, "trainingPrograms", editedProgram.id);
    await updateDoc(programRef, {
      title: newDetails.title,
      duration: newDetails.duration,
      price: newDetails.price,
      description: newDetails.description,
      link: newDetails.link,
    });
    setEditedProgram(null);
    setNewDetails({
      title: "",
      duration: "",
      price: "",
      description: "",
      link: ""
    });
    setShowModal(false);
    alert("Program Updated Successfully!");
  };

  // Handle Form Submission for Adding a New Program
  const handleAddProgram = async () => {
    await addDoc(collection(db, "trainingPrograms"), {
      title: newDetails.title,
      duration: newDetails.duration,
      price: newDetails.price,
      description: newDetails.description,
      link: newDetails.link,
    });
    setNewDetails({
      title: "",
      duration: "",
      price: "",
      description: "",
      link: ""
    });
    setShowModal(false);
    alert("New Program Added Successfully!");
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setEditedProgram(null);
    setNewDetails({
      title: "",
      duration: "",
      price: "",
      description: "",
      link: ""
    });
  };

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Admin - Manage Training Programs</h2>

      {/* Button to Add New Program */}
      <button
        onClick={() => setShowModal(true)}
        className="text-white bg-green-500 px-6 py-2 rounded-full text-xl mb-8"
      >
        <i className="fa fa-plus mr-2"></i> Add New Program
      </button>

      {/* Display Programs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <div key={program.id} className="shadow-lg bg-white rounded-lg p-6 flex flex-col items-center">
            <h4 className="text-xl font-semibold text-gray-800">{program.title}</h4>
            <p className="text-gray-600 mb-4">
              <strong>Duration:</strong> {program.duration}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Price:</strong> ₹{program.price}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Description:</strong> {program.description}
            </p>
            <button
              onClick={() => handleEdit(program)}
              className="text-white bg-primary px-6 py-2 rounded-full text-sm"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Program Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editedProgram ? `Edit ${editedProgram.title}` : "Add New Training Program"}
            </h3>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={newDetails.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={newDetails.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={newDetails.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Description</label>
              <textarea
                name="description"
                value={newDetails.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Link</label>
              <input
                type="text"
                name="link"
                value={newDetails.link}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="text-white bg-red-500 px-6 py-2 rounded-full text-sm"
              >
                Cancel
              </button>
              <button
                onClick={editedProgram ? handleUpdate : handleAddProgram}
                className="text-white bg-primary px-6 py-2 rounded-full text-sm"
              >
                {editedProgram ? "Update Program" : "Add Program"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAdminTrainingPrograms;
