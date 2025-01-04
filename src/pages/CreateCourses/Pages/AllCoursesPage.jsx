import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesList);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/usercourse/${courseId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">All Courses</h2>

      {/* Courses grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {courses.map(course => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => handleCourseClick(course.id)}
          >
            <div className="p-6">
              {/* Course Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{course.title}</h3>

              {/* Course Content Preview */}
              <p className="text-gray-700 text-base mb-4">
                {course.content.length > 100 ? `${course.content.slice(0, 100)}...` : course.content}
              </p>

              {/* Hover Effects */}
              <div className="mt-4 text-center">
                <button className="text-blue-500 hover:text-blue-700 font-medium">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCoursesPage;
