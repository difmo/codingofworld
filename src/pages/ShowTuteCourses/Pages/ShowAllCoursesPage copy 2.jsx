import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ShowAllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);

  const navigate = useNavigate();

useEffect(() => {
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const snapshot = await getDocs(collection(db, "courses"));

      const allCourses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched courses:", allCourses); // ✅ Check if UUIDs appear
      setCourses(allCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setErrorMessage("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);


  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCourseClick = (courseId) => {
    navigate(`show-courses/${courseId}`);
  };

  if (errorMessage) {
    return (
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error:</strong> {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="py-16 heading">
        <h1 className="text-3xl font-semibold dark:text-white text-black md:text-4xl">
          All Courses
        </h1>
        <span className="block mt-2 text-sm md:text-base dark:text-white">
          Browse all available courses
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(coursesPerPage)].map((_, i) => (
            <div key={i} className="bg-gray-300 dark:bg-gray-700 rounded-lg shadow-lg p-6 animate-pulse">
              <div className="bg-gray-400 h-6 mb-4 rounded"></div>
              <div className="bg-gray-400 h-4 mb-2 rounded"></div>
              <div className="bg-gray-400 h-4 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
            No Courses Found
          </h2>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 transition"
                onClick={() => handleCourseClick(course.id)}
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {course.title || "Untitled Course"}
                </h3>
                <div
                  className="text-gray-700 dark:text-gray-300 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: course.content
                      ? course.content.slice(0, 100) + "..."
                      : "No content available",
                  }}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-lg ${currentPage === pageNumber
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowAllCoursesPage;
