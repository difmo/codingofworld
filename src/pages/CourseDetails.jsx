import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";
import FormattedContent from "@/Utils/FormattedContent";
import RouteConstants from "@/constants/routeConstants/RouteConstants";

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!course) {
    return <p className="text-center text-lg">Course not found!</p>;
  }

  return (
    <div className="py-12 px-6 sm:px-8 lg:px-16 bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300">


      {/* ///////////////////// */}
      {/* ///////////////////// */}
      {/* ///////////////////// */}
      {/* ///////////////////// */}
      {/* ///////////////////// */}
      {/* ///////////////////// */}

      <div className="flex justify-center px-4 py-8 dark:bg-dark dark:text-white min-h-screen">
        <div className="w-full max-w-6xl">
          {/* Internship Banner */}
          {/* Custom Internship Banner */}
          <div className="bg-gradient-to-r from-primary to-blue-500 text-white rounded-xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold mb-2">{course.title || "Frontend Developer Internship"}</h1>
            <p className="text-lg font-medium">{course.company || "Difmo Technologies Pvt. Ltd."}</p>
            <p className="text-md mt-1">{course.shortDescription || "Lucknow,Gomti Nagar"}</p>
          </div>


          {/* Internship Content */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Description */}
            <div className="md:col-span-2 bg-white dark:bg-neutral-900 p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">About the Course</h2>
              <div className="prose dark:prose-invert max-w-none">
                <FormattedContent html={course.description} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="bg-white h-fit dark:bg-neutral-900 rounded-xl p-6 shadow-lg flex flex-col justify-between sticky top-20">
              <div>
                      <div className="prose dark:prose-invert max-w-none">
                  <FormattedContent html={course.bio} />
                </div>
              </div>

              <button
                onClick={() => navigate(RouteConstants.MAINROUTE.CONTACTUS)}
                className="mt-8 w-full px-6 py-3 bg-primary text-white font-semibold text-lg rounded-md shadow-md transition-all duration-300 hover:bg-primary/90 hover:scale-[1.03]"
              >
                ENROLL NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
