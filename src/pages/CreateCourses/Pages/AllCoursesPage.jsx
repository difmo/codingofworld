import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../firebase';
import { collection, getDocs, doc, deleteDoc, where, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { MdDelete } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const currentUser = user.uid;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(
          collection(db, 'courses'),
          where('userId', '==', currentUser) 
        );
        const querySnapshot = await getDocs(q); 
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
    navigate(`/create-courses/edit-and-show/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (isConfirmed) {
      try {
        const courseDocRef = doc(db, 'courses', courseId);
        await deleteDoc(courseDocRef);
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
        alert('Course deleted successfully!');
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course.');
      }
    }
  };

  const handleAddCourse = () => {
    navigate('/create-courses/create-course'); 
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
            <div className="p-6 relative">
              {/* Delete Button with React Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering course click
                  handleDeleteCourse(course.id);
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
              >
                <MdDelete size={24} /> {/* Trash icon */}
              </button>

              {/* Course Title with dangerouslySetInnerHTML */}
              <h3
                className="text-xl font-semibold text-gray-900 mb-4"
                dangerouslySetInnerHTML={{ __html: course.title }} // Use dangerouslySetInnerHTML for title
              />

              {/* Course Content Preview with dangerouslySetInnerHTML */}
              <p className="text-gray-700 text-base mb-4"
                dangerouslySetInnerHTML={{ __html: course.content.length > 100 ? `${course.content.slice(0, 100)}...` : course.content }} // Use dangerouslySetInnerHTML for content
              />

              {/* Hover Effects */}
              <div className="mt-4 text-center">
                <button className="text-blue-500 hover:text-blue-700 font-medium">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Course Button with React Icon */}
      <button
        onClick={handleAddCourse}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <AiOutlinePlus size={30} /> {/* Plus icon */}
      </button>
    </div>
  );
};

export default AllCoursesPage;
