import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ComingSoon from './ComingSoon';

// Sample courses data
const courses = [
  {
    id: 1,
    title: "Java Fundamentals: Building Robust Applications",
    description: "Master core Java concepts and build robust applications.",
    cover: "img6",
    whatYouLearn: [
      "Understand OOP concepts like Classes, Objects, and Inheritance.",
      "Work with Collections, Streams, and Lambda expressions.",
      "Build real-world Java applications.",
    ],
    // price: "$55",
  },

  {
    id: 3,
    title: "Flutter Development: Build Beautiful Apps",
    description: "Learn to create beautiful, fast, and native apps with Flutter.",
    cover: "img5", 
    whatYouLearn: [
      "Introduction to Flutter and Dart.",
      "Create responsive UI for mobile applications.",
      "Integrate with REST APIs and databases.",
    ],
    // price: "$60",
  },
];

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const courseData = courses.find(course => course.id.toString() === id);
    setCourse(courseData);
  }, [id]);

  if (!course) {
    return <ComingSoon/>
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col items-center">
        <img src={course.cover} alt={course.title} className="w-full h-80 object-cover rounded-lg shadow-lg" />
        <h1 className="text-3xl font-bold mt-6">{course.title}</h1>
        <p className="text-lg text-gray-700 mt-4">{course.description}</p>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">What You Will Learn:</h3>
          <ul className="list-disc list-inside mt-4 space-y-2">
            {course.whatYouLearn.map((item, index) => (
              <li key={index} className="text-lg text-gray-600">{item}</li>
            ))}
          </ul>
        </div>
        <p className="text-xl font-semibold mt-6">Price: {course.price}</p>
        {/* <button
          onClick={() => alert('Enroll Now!')}
          className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Enroll Now
        </button> */}
      </div>
    </div>
  );
};

export default CourseDetails;
