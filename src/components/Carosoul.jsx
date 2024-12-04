import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import your Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Firestore methods

const CourseList = () => {
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses")); // Replace "courses" with your Firestore collection name
        const fetchedCourses = [];
        querySnapshot.forEach((doc) => {
          fetchedCourses.push({ ...doc.data(), id: doc.id }); // Include document ID
        });
        setCourses(fetchedCourses);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader border-t-transparent border-blue-500 h-10 w-10 rounded-full animate-spin"></div>
        <span className="ml-4 text-blue-500 text-lg font-semibold">
          Loading courses...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full table-auto mx-auto text-center">
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{course.title}</td>
                <td className="px-4 py-2 border-b">{course.description}</td>
                <td className="px-4 py-2 border-b">
                  {course.thumbnailUrl && (
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-20 h-20 object-cover mx-auto"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
