import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "newcourse", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCourse(docSnap.data());
        } else {
          setError("Course not found!");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Toggle dark mode using Tailwind's dark class
  const toggleDarkMode = () => {
    // This toggles the dark class on the body
    const root = document.documentElement;
    root.classList.toggle('dark');
  };

  if (loading) {
    return <Loader />; // Loading state
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Error state
  }

  if (!course) {
    return <p className="text-center text-lg">Course not found!</p>; // If no course data is found
  }

  return (
    <div className="py-10 px-4 sm:px-8 lg:px-12 bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300">

      <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-8 text-gray-800 dark:text-gray-200">
        {course.title}
      </h2>

      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10">
        {/* Thumbnail on the left side */}
        <div className="w-full lg:w-1/2 ">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full object-cover rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
          />
        </div>

        {/* Bio and button section */}
        <div className="w-full lg:w-1/2 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="mb-6">
            <p
              className="text-lg text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: course.bio }}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate("/contactus")}
              className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              ENROLL NOW
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-4xl mx-auto">
        <p
          className="text-lg text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
      </div>

    </div>
  );
};

export default CourseDetails;
