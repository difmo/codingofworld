import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
   console.log("coursedetails id ", id);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courses = [
        { id: '1', title: 'Course 1', description: 'Details of Course 1Details of Course 1Details of Course 1Details of Course 1Details of Course 1Details of Course 1Details of Course 1Details of Course 1Details of Course 1Details of Course 1Details  of Course 1Details of Course 1Details of Course 1Details of Course 1Details of Course 1Details of Course 1', cover: '/path/to/image1' },
        { id: '2', title: 'Course 2', description: 'Details of Course 2', cover: '/path/to/image2' },
        { id: '3', title: 'Course 3', description: 'Details of Course 3', cover: '/path/to/image3' },
      ];

      const courseData = courses.find((course) => course.id === id);
      setCourse(courseData);
    };

    fetchCourseDetails();
  }, [id]); 
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-details">
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
        <h1>all courses</h1>
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <img src={course.cover} alt={course.title} className="w-full h-60 object-cover" />
      <p className="mt-4">{course.description}</p>
    </div>
  );
};

export default CourseDetails;
