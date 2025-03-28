import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ShowAllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  const fetchUserEmail = async (userId) => {
    console.log("user id from passed" + userId);
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
  
      if (!userDocSnap.exists()) {
        console.log("User document does not exist for userId:", userId);
        return null; // Return null if user document doesn't exist
      }
  
      return userDocSnap.data().email; // Return the email if user document exists
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null; // Return null in case of error
    }
  };
  



  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesList = [];
  
        for (const docSnap of querySnapshot.docs) {
          const courseData = {
            id: docSnap.id,
            ...docSnap.data(),
          };
  
          const userId = courseData.userId;
  
          // Fetch the user email using the new function
        console.log("user id pritam" + userId);
          const userEmail = await fetchUserEmail(userId);
          
  
          // Add the user email to the course data
          coursesList.push({
            ...courseData,
            userEmail,
          });
        }
  
        // Update state with the courses list
        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setErrorMessage("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, []);
  

  const handleCourseClick = (courseId) => {
    navigate(`showcoursee/${courseId}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6 ">
      <div className="py-16 heading">
        <h1 className="text-3xl font-semibold text-black md:text-4xl">
          Some other courses
        </h1>
        <span className="block mt-2 text-sm md:text-base">
          Learn from the best instructors and get certified
        </span>
      </div>

      {/* Courses grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-secondaryblue border border-gray-200 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
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
                className="text-white text-base my-4"
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
    </div>
  );
};

export default ShowAllCoursesPage;
