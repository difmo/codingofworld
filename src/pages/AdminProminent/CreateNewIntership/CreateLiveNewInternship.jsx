import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const CreateLiveNewInternship = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    const querySnapshot = await getDocs(collection(db, "admin"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInternships(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    await addDoc(collection(db, "admin"), {
      title,
      description,
      timestamp: new Date(),
    });

    setTitle("");
    setDescription("");
    setShowForm(false);
    fetchInternships();
  };

  return (
    <div className="relative min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create New Internship</h1>

      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
        onClick={() => setShowForm(true)}
      >
        +
      </button>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">New Internship</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
              />
              <label className="block mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Submitted Data */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Submitted Internships</h2>
        {internships.length === 0 ? (
          <p>No internships available.</p>
        ) : (
          <ul className="space-y-2">
            {internships.map((internship) => (
              <li key={internship.id} className="p-4 bg-white shadow rounded">
                <Link
                  to="/admin/internship"
                  state={{
                    title: internship.title,
                    description: internship.description,
                  }}
                  className="block"
                >
                  <h3 className="font-semibold">{internship.title}</h3>
                  <p>{internship.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateLiveNewInternship;
