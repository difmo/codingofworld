import React, { useState } from 'react';
import { auth, db } from '../firebase';  // Import Firebase functions
import { query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const Popupbloge = ({ onClose }) => {  
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !mobile) {
      setError("Name and mobile number are required.");
      return;
    }

    const user = auth.currentUser;
    
    if (!user) {
      setError("User is not authenticated.");
      return;
    }

    try {
      const userQuery = query(collection(db, 'users'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        setError("User not found in the database.");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      
      const userRef = doc(db, 'users', userDoc.id); 

      await updateDoc(userRef, {
        name,   
        mobile,  
      });

      setSuccess("Data updated successfully!");
      setName('');
      setMobile('');
      setError('');
    } catch (error) {
      setError("Failed to update data.");
      console.error("Error updating document: ", error);
    }
  };

  // Close the popup when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();  // Trigger the close function passed as prop
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={handleOutsideClick}  // Close popup on outside click
    >
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <button
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
          onClick={onClose}  // Close the popup when button is clicked
        >
          &times;
        </button>
        <h2 className="mb-4 text-2xl font-semibold text-center">Enter Your Information</h2>
        
        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
        {success && <p className="mb-3 text-sm text-green-500">{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block font-medium text-gray-700">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white rounded-md bg-primary hover:bg-primary/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popupbloge;
