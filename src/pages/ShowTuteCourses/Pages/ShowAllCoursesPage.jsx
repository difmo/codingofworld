import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { slugify } from "@/Utils/slugify";

const ShowAllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6); // Number of courses to show per page

  const navigate = useNavigate();

  const fetchUserEmail = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.log("User document does not exist for userId:", userId);
        return null;
      }

      return userDocSnap.data().email;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {

    const migrateCourseIds = async () => {
      const snapshot = await getDocs(collection(db, "courses"));
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        if (!data.title) continue;

        const slug = slugify(data.title);
        
        // Optional: skip if already exists
        await setDoc(doc(db, "courses", slug), data);

        // Optional: delete old doc
        await deleteDoc(doc(db, "courses", docSnap.id));
      }
    }
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesList = [];

        for (const docSnap of querySnapshot.docs) {
          const courseData = {
            id: docSnap.id,
            ...docSnap.data(),
          };
          console.log("form show all courses ",courseData)

          const userId = courseData.userId;
          const userEmail = await fetchUserEmail(userId);

          coursesList.push({
            ...courseData,
            userEmail,
          });
        }



        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setErrorMessage("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    // migrateCourseIds();

    fetchCourses();
  }, []);

  // Paginate courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses
    .filter((course) => course.approved)
    .slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCourseClick = (courseId) => {
    navigate(`show-courses/${courseId}`);
  };

  const totalPages = Math.ceil(courses.filter((course) => course.approved).length / coursesPerPage);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="py-16 heading">
        <h1 className="text-3xl font-semibold dark:text-white text-black md:text-4xl">
          Some Other Courses
        </h1>
        <span className="block mt-2 text-sm md:text-base dark:text-white">
          Learn from the best instructors and get certified
        </span>
      </div>

      {/* Shimmer Loader (While data is loading) */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {[...Array(coursesPerPage)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 dark:bg-gray-700 rounded-lg shadow-lg p-6 animate-pulse"
            >
              <div className="bg-gray-400 dark:bg-gray-600 h-6 mb-4 rounded-lg"></div>
              <div className="bg-gray-400 dark:bg-gray-600 h-4 mb-4 rounded-lg"></div>
              <div className="bg-gray-400 dark:bg-gray-600 h-4 rounded-lg w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        // Courses grid layout
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {currentCourses.map((course) => (
            <div
              key={course.id}
              className=" bg-white dark:bg-gray-900 dark:border border-gray-700 dark:border-gray-600 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="p-6">
                {/* Course Title */}
                <div className="bg-gradient-to-r from-primary via-primary to-secondaryblue px-6 py-3 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold text-white">
                    {course.title
                      ? course.title.split(" ").slice(0, 5).join(" ") + "..."
                      : ""}
                  </h3>
                </div>

                {/* Course Content Preview */}
                <p
                  className="dark:text-white  text-base my-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      course.content.length > 100
                        ? `${course.content.slice(0, 100)}...`
                        : course.content,
                  }}
                />

                {/* Hover Effects */}
                <div className="mt-4 text-center">
                  <button className="text-primary hover:text-blue-700 font-medium">
                    Start Reading Free {course.userEmail}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary border border-primary text-white rounded-lg mr-4 hover:bg-transparent hover:text-primary transition-all"
        >
          Previous
        </button>

        {/* Page Number */}
        <span className="text-xl font-semibold text-black dark:text-white">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary border border-primary text-white rounded-lg ml-4 hover:bg-transparent hover:text-primary transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowAllCoursesPage;
