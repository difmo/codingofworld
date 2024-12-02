import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return <div>Loading course details...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  if (!course) {
    return <p>Course not found!</p>; // If no course data is found
  }

  return (
    <div className="py-10 px-4 sm:px-8 lg:px-64">
      <h2 className="text-3xl md:text-6xl text-center font-bold mb-6">
        {course.title}
      </h2>
      <div className="flex justify-between flex-wrap">
        {/* Thumbnail on the left side */}
        <div className="w-full md:w-1/2 p-3">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="my-4 object-cover rounded-md w-full"
          />
        </div>

        {/* Bio and button section */}
        <div className="p-4 md:p-12 w-full md:w-1/2">
          <div>
            <p
              className="text-lg mt-2"
              dangerouslySetInnerHTML={{ __html: course.bio }}
            />
          </div>
          <div className="py-7">
            <button
              onClick={() => navigate("/internshipform")}
              className="px-4 py-2 text-white transition-all duration-300 bg-primary hover:bg-primary/60 rounded-xl w-full md:w-auto"
            >
              ENROLL NOW
            </button>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-8">
        <p
          className="text-lg mt-2"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
      </div>
    </div>
  );
};

export default CourseDetails;
