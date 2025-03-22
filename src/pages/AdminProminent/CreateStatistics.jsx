import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Import your Firebase config
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore functions

const CreateStatistics = () => {
  const [counterData, setCounterData] = useState({
    studentsTaught: 0,
    totalPlacements: 0,
    studentsInIT: 0,
    placementAssistance: 0,
  });
  const [editing, setEditing] = useState(false); // Toggle editing mode
  const [newValues, setNewValues] = useState(counterData); // Store new values when editing

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchCounterData = async () => {
      const docRef = doc(db, "counterStats", "factsData"); // Firestore path
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCounterData(docSnap.data());
        setNewValues(docSnap.data()); // Set initial values for editing
      } else {
        console.log("No such document!");
      }
    };

    fetchCounterData();
  }, []);

  // Function to handle counter value update
  const handleUpdateCounter = async () => {
    const docRef = doc(db, "counterStats", "factsData"); // Firestore path
    await setDoc(docRef, newValues); // Update the Firestore document
    setCounterData(newValues); // Update the local state
    setEditing(false); // Exit editing mode
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Students Taught */}
        <div className="single-count text-center bg-white shadow-lg rounded-lg p-6">
          <i className="fa-solid fa-user text-4xl text-primary mb-4"></i>
          <h2 className="text-3xl font-semibold text-gray-800">
            {editing ? (
              <input
                type="number"
                value={newValues.studentsTaught}
                onChange={(e) => setNewValues({ ...newValues, studentsTaught: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              counterData.studentsTaught
            )}
          </h2>
          <p className="text-gray-600">Students taught so far</p>
        </div>

        {/* Total Placements */}
        <div className="single-count text-center bg-white shadow-lg rounded-lg p-6">
          <i className="fa-solid fa-user-graduate text-4xl text-primary mb-4"></i>
          <h2 className="text-3xl font-semibold text-gray-800">
            {editing ? (
              <input
                type="number"
                value={newValues.totalPlacements}
                onChange={(e) => setNewValues({ ...newValues, totalPlacements: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              counterData.totalPlacements
            )}
          </h2>
          <p className="text-gray-600">Total Placements</p>
        </div>

        {/* Students in IT Companies */}
        <div className="single-count text-center bg-white shadow-lg rounded-lg p-6">
          <i className="fa-solid fa-building text-4xl text-primary mb-4"></i>
          <h2 className="text-3xl font-semibold text-gray-800">
            {editing ? (
              <input
                type="number"
                value={newValues.studentsInIT}
                onChange={(e) => setNewValues({ ...newValues, studentsInIT: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              counterData.studentsInIT
            )}
          </h2>
          <p className="text-gray-600">Students placed in Top IT Companies</p>
        </div>

        {/* Placement Assistance */}
        <div className="single-count text-center bg-white shadow-lg rounded-lg p-6">
          <i className="fa-solid fa-handshake text-4xl text-primary mb-4"></i>
          <h2 className="text-3xl font-semibold text-gray-800">
            {editing ? (
              <input
                type="number"
                value={newValues.placementAssistance}
                onChange={(e) => setNewValues({ ...newValues, placementAssistance: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              counterData.placementAssistance
            )}
          </h2>
          <p className="text-gray-600">Placement Assistance</p>
        </div>
      </div>

      {/* Edit and Save Button */}
      <div className="text-center mt-8">
        {editing ? (
          <button
            onClick={handleUpdateCounter}
            className="bg-primary text-white py-2 px-6 rounded-lg"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-primary text-white py-2 px-6 rounded-lg"
          >
            Edit Values
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateStatistics;
