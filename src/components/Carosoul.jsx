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
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4 text-center">All Courses</h1> */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto mx-auto text-center">
          {/* <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Thumbnail</th>
            </tr>
          </thead> */}
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
