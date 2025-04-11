import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Admincourse = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesList = []; // Initialize an array to hold all course data

        querySnapshot.docs.forEach((docSnap) => {
          let courseData = {
            id: docSnap.id,
            ...docSnap.data(),
          };
          coursesList.push(courseData); // Push each course data into the list
        });

        setCourses(coursesList); // Update state with the courses list
      } catch (error) {
        console.error("Error fetching courses:", error);
        setErrorMessage("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array, so this runs only once when the component mounts

  const handleCourseClick = (courseId) => {
    navigate(`showcoursee/${courseId}`);
  };

  // Handle Course Edit
  const handleEditCourse = (courseId) => {
    navigate(`/admin/edit-and-show/${courseId}`);
  };

  // Handle Course Delete
  const handleDeleteCourse = async (courseId) => {
    try {
      const courseRef = doc(db, "courses", courseId);
      await deleteDoc(courseRef);
      setCourses(courses.filter((course) => course.id !== courseId)); // Remove course from state
    } catch (error) {
      console.error("Error deleting course:", error);
      setErrorMessage("Error deleting course");
    }
  };

  // Handle Approve Course
  const handleApproveCourse = async (courseId) => {
    try {
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, { approved: true });
      // Update the local courses list to reflect the approved status
      setCourses(
        courses.map((course) =>
          course.id === courseId ? { ...course, approved: true } : course
        )
      );
    } catch (error) {
      console.error("Error approving course:", error);
      setErrorMessage("Error approving course");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6 ">
      <div className="py-16 heading">
        <h1 className="text-3xl font-semibold dark:text-white text-black md:text-4xl">
          Some other courses
        </h1>
        <span className="block mt-2 text-sm md:text-base">
          Learn from the best instructors and get certified
        </span>
      </div>

      {/* Display loading message or courses list */}
      {loading ? (
        <div>Loading courses...</div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {courses
            // .filter((course) => course.approved) // Filter approved courses
            .map((course) => (
              <div
                key={course.id}
                className="bg-secondaryblue border border-gray-200 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                // onClick={() => handleCourseClick(course.id)}
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
                    className="text-white text-base my-4"
                    dangerouslySetInnerHTML={{
                      __html:
                        course.content.length > 100
                          ? `${course.content.slice(0, 100)}...`
                          : course.content,
                    }}
                  />

                  {/* Admin Actions (Edit, Delete, Approve) */}
                  <div className="mt-4 text-center flex justify-between">
                    <button
                      className="text-primary border-2 px-6 py-2 rounded-md  hover:text-blue-700 font-medium mr-2"
                      onClick={() => handleEditCourse(course.id)}
                    >
                      Edit
                    </button>
                    {/* <button
                      className="text-red-600 border-2 px-6 py-2 rounded-md hover:text-red-800 font-medium mr-2"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Delete
                    </button> */}
                    {!course.approved && (
                      <button
                        className="text-green-600 border-2 px-6 py-2 rounded-md hover:text-green-800 font-medium"
                        onClick={() => {
                          handleApproveCourse(course.id);
                          alert("Course Approved!");
                        }}
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Admincourse;
