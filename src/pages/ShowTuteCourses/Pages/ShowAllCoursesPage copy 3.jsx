import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { slugify } from "@/Utils/slugify";
import { getAuth } from "firebase/auth";

const ShowAllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6); // Number of courses to show per page

  const navigate = useNavigate();

  const fetchUserEmail = async (userId) => {
    try {
      if (!userId) {
        console.warn("No userId provided");
        return "Unknown User";
      }

      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.log("User document does not exist for userId:", userId);
        return "User Not Found";
      }

      const userData = userDocSnap.data();
      return userData.email || "No Email";
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "Error Loading Email";
    }
  };

  useEffect(() => {

const migrateWithSubTopicsCourseIds = async () => {
  try {
    const auth = getAuth();
    const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
    const currentUserEmail = "pritamcodeservir@gmail.com";
    const currentUserName = "pritam";

    const courseSnapshot = await getDocs(collection(db, "courses"));

    for (const courseDoc of courseSnapshot.docs) {
      const courseData = courseDoc.data();
      if (!courseData.title) continue;

      const newCourseId = slugify(courseData.title); // generate a readable ID
      const newCourseRef = doc(db, "tutorial-courses", newCourseId); // 🔄 use new collection here

      // Create the new course document with extra metadata
      const newCourseData = {
        ...courseData,
        userId: currentUserId,
        userEmail: currentUserEmail,
        userName: currentUserName,
        content: courseData.description?.content || "<p>No content</p>",
        createdAt: courseData.description?.createdAt || new Date(),
        isPublished: true,
        title: courseData.title,
      };

      await setDoc(newCourseRef, newCourseData);

      // Migrate topics
      const topicsSnapshot = await getDocs(collection(courseDoc.ref, "topics"));
      for (const topicDoc of topicsSnapshot.docs) {
        const topicData = topicDoc.data();
        const newTopicRef = doc(newCourseRef, "topics", topicDoc.id);
        await setDoc(newTopicRef, topicData);

        // Migrate subtopics
        const subtopicsSnapshot = await getDocs(collection(topicDoc.ref, "subtopics"));
        for (const subtopicDoc of subtopicsSnapshot.docs) {
          const subtopicData = subtopicDoc.data();
          const newSubtopicRef = doc(newTopicRef, "subtopics", subtopicDoc.id);
          await setDoc(newSubtopicRef, subtopicData);
        }
      }

      // Optional: delete the old course document
      // await deleteDoc(courseDoc.ref);
    }

    console.log("Migration completed successfully to 'newCourses'.");
  } catch (error) {
    console.error("Error migrating course IDs:", error);
  }
};


    

  
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setErrorMessage(""); // Clear previous error messages

        const querySnapshot = await getDocs(collection(db, "courses"));
        console.log("Total documents found:", querySnapshot.docs.length);

        if (querySnapshot.empty) {
          console.log("No courses found in the collection");
          setCourses([]);
          return;
        }

        // Use Promise.all for better performance when fetching user emails
        const coursesWithUsers = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            try {
              const courseData = {
                id: docSnap.id,
                ...docSnap.data(),
              };

              console.log("Processing course:", courseData.id);

              // Fetch user email if userId exists
              let userEmail = "Unknown User";
              if (courseData.userId) {
                userEmail = await fetchUserEmail(courseData.userId);
              }

              return {
                ...courseData,
                userEmail,
              };
            } catch (error) {
              console.error(`Error processing course ${docSnap.id}:`, error);
              // Return course data without user email if there's an error
              return {
                id: docSnap.id,
                ...docSnap.data(),
                userEmail: "Error Loading Email",
              };
            }
          })
        );

        console.log("Final courses list:", coursesWithUsers);
        setCourses(coursesWithUsers);

      } catch (error) {
        console.error("Error fetching courses:", error);
        setErrorMessage(`Error fetching courses: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Uncomment if you need to migrate course IDs
    // migrateCourseIds();
    // migrateWithSubTopicsCourseIds();

    fetchCourses();
  }, []);

  // Paginate courses - only show approved courses
  const approvedCourses = courses.filter((course) => course.approved);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = approvedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCourseClick = (courseId) => {
    navigate(`show-courses/${courseId}`);
  };

  const totalPages = Math.ceil(approvedCourses.length / coursesPerPage);

  // Show error message if there's an error
  if (errorMessage) {
    return (
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      </div>
    );
  }

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

      {/* Display total courses count */}
      {!loading && (
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {currentCourses.length} of {approvedCourses.length} approved courses
          </p>
        </div>
      )}

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
      ) : approvedCourses.length === 0 ? (
        // No courses message
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
            No Approved Courses Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            There are currently no approved courses available.
          </p>
        </div>
      ) : (
        // Courses grid layout
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {currentCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-900 dark:border border-gray-700 dark:border-gray-600 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="p-6">
                {/* Course Title */}
                <div className="bg-gradient-to-r from-primary via-primary to-secondaryblue px-6 py-3 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold text-white">
                    {course.title
                      ? course.title.split(" ").slice(0, 5).join(" ") +
                      (course.title.split(" ").length > 5 ? "..." : "")
                      : "Untitled Course"}
                  </h3>
                </div>

                {/* Course Content Preview */}
                <div
                  className="dark:text-white text-base my-4"
                  dangerouslySetInnerHTML={{
                    __html: course.content
                      ? course.content.length > 100
                        ? `${course.content.slice(0, 100)}...`
                        : course.content
                      : "No content available",
                  }}
                />

                {/* Course Author */}
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">By: </span>
                  <span>{course.userEmail}</span>
                </div>

                {/* Action Button */}
                <div className="mt-4 text-center">
                  <button className="text-primary hover:text-blue-700 font-medium transition-colors">
                    Start Reading Free
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls - Only show if there are multiple pages */}
      {totalPages > 1 && !loading && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg transition-all ${currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary border border-primary text-white hover:bg-transparent hover:text-primary"
              }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-2 rounded-lg transition-all ${currentPage === pageNumber
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg transition-all ${currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary border border-primary text-white hover:bg-transparent hover:text-primary"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowAllCoursesPage;