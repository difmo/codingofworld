import React from "react";

const courses = [
  {
    title: "React Development",
    description:
      "Dive into the world of modern front-end development with React.js, the most popular JavaScript library for building interactive user interfaces.",
    highlights: [
      "Fundamentals of React.js",
      "State and Props Management",
      "Lifecycle Methods",
      "React Hooks (useState, useEffect, and custom hooks)",
      "Advanced Component Patterns",
      "Routing with React Router",
      "Integration with APIs",
      "Project: Build a Fully Functional React App",
    ],
    prerequisites: [
      "Basic knowledge of HTML, CSS, and JavaScript.",
      "Familiarity with ES6 syntax is a plus.",
    ],
    duration: "6 Weeks",
  },
  {
    title: "MERN Development",
    description:
      "Master full-stack development using the MERN stack. Learn how to build robust web applications with both front-end and back-end technologies.",
    highlights: [
      "Introduction to Full-Stack Development",
      "MongoDB: Database Design and CRUD Operations",
      "Express.js: Backend Framework Essentials",
      "React.js: Front-End with Dynamic UI",
      "Node.js: Server-Side Development",
      "RESTful APIs and Authentication",
      "Deployment on Cloud Platforms (Heroku/AWS)",
      "Project: Build and Deploy a MERN Stack Application",
    ],
    prerequisites: [
      "Familiarity with JavaScript and basic web development concepts.",
      "React.js knowledge is recommended but not mandatory.",
    ],
    duration: "10 Weeks",
  },
  {
    title: "App Development",
    description:
      "Explore the world of mobile app development with React Native and Flutter. Create cross-platform apps with cutting-edge frameworks.",
    highlights: [
      "React Native: Basics to Advanced",
      "Flutter: Widgets and State Management",
      "UI/UX Best Practices for Mobile",
      "Using APIs for Real-Time Features",
      "Firebase Integration for Backend Services",
      "Testing and Debugging Mobile Apps",
      "Deployment to App Stores (iOS/Android)",
      "Project: Develop and Publish Your Own Mobile App",
    ],
    prerequisites: [
      "Basic programming knowledge.",
      "Experience with JavaScript (for React Native) or Dart (for Flutter) is advantageous.",
    ],
    duration: "12 Weeks",
  },
  {
    title: "DSA (Data Structures & Algorithms)",
    description:
      "Build a solid foundation in Data Structures and Algorithms (DSA) to excel in technical interviews and optimize problem-solving skills.",
    highlights: [
      "Understanding Time and Space Complexity",
      "Arrays, Linked Lists, and Strings",
      "Stacks and Queues",
      "Trees and Graphs",
      "Dynamic Programming and Recursion",
      "Sorting and Searching Algorithms",
      "Greedy Algorithms and Backtracking",
      "Project: Solve 100+ Coding Problems",
    ],
    prerequisites: [
      "Basic programming skills in any language (C++, Java, or Python).",
      "Understanding of fundamental math concepts.",
    ],
    duration: "8 Weeks",
  },
];

const CoursePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10">
      <h1 className="text-4xl font-bold text-center mb-8">Courses We Offer</h1>
      <div className="space-y-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {course.title}
            </h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Highlights:</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {course.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                Prerequisites:
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {course.prerequisites.map((prerequisite, idx) => (
                  <li key={idx}>{prerequisite}</li>
                ))}
              </ul>
            </div>
            <p className="text-gray-600 font-medium mb-4">
              <strong>Duration:</strong> {course.duration}
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
