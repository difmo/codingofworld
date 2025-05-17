import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

const Allcourse = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const [course, setCourse] = useState([]); 
  const [error, setError] = useState(null); 

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

  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`);
  };

  const handleAddCourse = () => {
    navigate("/admin/add-course"); // Assumes you have a route for adding
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 relative">
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

      {/* Floating + Button */}
      <button
        onClick={handleAddCourse}
        className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-600 text-3xl"
        title="Add Course"
      >
        +
      </button>
    </div>
  );
};

export default Allcourse;
