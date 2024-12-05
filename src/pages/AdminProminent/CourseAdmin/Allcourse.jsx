import React, { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Import Firestore config
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; // Firestore methods
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

const Allcourse = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For navigation
  const [course, setCourse] = useState([]); // Store course data
  const [error, setError] = useState(null); // Error state

  // Fetch Course data from Firestore
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newcourse"));
        const fetchedCourse = [];
        querySnapshot.forEach((doc) => {
          fetchedCourse.push({ ...doc.data(), id: doc.id });
        });
        setCourse(fetchedCourse);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Course:", error);
        setError("Failed to load Course.");   
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const docRef = doc(db, "newcourse", id);
        await deleteDoc(docRef);
        setCourse(course.filter((course) => course.id !== id));
        alert("Course deleted successfully!");
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course.");
      }
    }
  };

  // Handle edit action (navigate to edit form with course ID)
  const handleEdit = (id) => {
    console.log("Navigating to edit course with ID:", id); // Debug log
    navigate(`/edit-course/${id}`);
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Course</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto mx-auto text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Thumbnail</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {course.map((course) => (
              <tr key={course.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{course.title}</td>
                <td className="px-4 py-2 border-b">
                  {course.thumbnailUrl && (
                    <img
                      src={course.thumbnailUrl}
                      alt="Thumbnail"
                      className="w-20 h-20 object-cover mx-auto"
                    />
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEdit(course.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
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

export default Allcourse;
