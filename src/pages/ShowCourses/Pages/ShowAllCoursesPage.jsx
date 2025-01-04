import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ShowAllCoursesPage = () => {
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
    navigate(`/showcoursee/${courseId}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="py-16 heading">
        <h1 className="text-3xl font-semibold text-black md:text-4xl">
          Discover the Perfect Online Course <br />
          with Certificates from{" "}
          <span className="text-primary">Difmo Technologies</span>
        </h1>
        <span className="block mt-2 text-sm md:text-base">
          With our expert guidance, you don't have to navigate your learning
          journey alone. Get the support you need to succeed.
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded md:w-1/3 md:mb-0"
          placeholder="Search for courses..."
        />
        <select className="w-full p-2 border border-gray-300 rounded md:w-1/3">
          <option>Sort by: Popularity</option>
          <option>Newest</option>
          <option>Highest Rated</option>
        </select>
      </div>

      {/* Courses grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {courses.map(course => (
          <div
            key={course.id}
            className="bg-secondaryblue border border-gray-200 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => handleCourseClick(course.id)}
          >
            <div className="p-6">
              {/* Course Title */}
              <div className="bg-gradient-to-r from-primary via-primary to-secondaryblue p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-white "> Learn {course.title}</h3>
              </div>


              {/* Course Content Preview */}
              <p className="text-white text-base mb-4"
                dangerouslySetInnerHTML={{
                  __html: course.content.length > 100
                    ? `${course.content.slice(0, 100)}...`
                    : course.content
                }}
              />

              {/* Hover Effects */}
              <div className="mt-4 text-center">
                <button className="text-primary hover:text-blue-700 font-medium">Start Reading Free</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllCoursesPage;
