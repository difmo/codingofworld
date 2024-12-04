import React, { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Import Firestore config
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; // Firestore methods
import { useNavigate } from "react-router-dom";

const AllInternship = () => {
  const [internships, setInternships] = useState([]); // Store internship data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // For navigation

  // Fetch internships data from Firestore
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newinternship"));
        const fetchedInternships = [];
        querySnapshot.forEach((doc) => {
          fetchedInternships.push({ ...doc.data(), id: doc.id });
        });
        setInternships(fetchedInternships);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching internships:", error);
        setError("Failed to load internships.");
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      try {
        const docRef = doc(db, "newinternship", id);
        await deleteDoc(docRef);
        setInternships(
          internships.filter((internship) => internship.id !== id)
        );
        alert("Internship deleted successfully!");
      } catch (error) {
        console.error("Error deleting internship:", error);
        alert("Failed to delete internship.");
      }
    }
  };

  // Handle edit action (navigate to edit form with internship ID)
  const handleEdit = (id) => {
    navigate(`/edit-internship/${id}`); // Navigate to edit form with internship ID
  };

  if (loading) {
    return <div>Loading internships...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Internships</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto mx-auto text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              {/* <th className="px-4 py-2 border-b">Bio</th>   */}
              <th className="px-4 py-2 border-b">Thumbnail</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((internship) => (
              <tr key={internship.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{internship.title}</td>

                {/* Display Thumbnail */}
                <td className="px-4 py-2 border-b">
                  {internship.thumbnailUrl && (
                    <img
                      src={internship.thumbnailUrl}
                      alt="Thumbnail"
                      className="w-20 h-20 object-cover mx-auto"
                    />
                  )}
                </td>

                {/* Actions for Edit and Delete */}
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEdit(internship.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(internship.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllInternship;
