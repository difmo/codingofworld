import React from "react";
import { FaGlobe, FaLaptopCode, FaAward, FaGraduationCap } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const CourseCard = () => {
  return (
    <div className="w-full p-4 md:w-1/4">
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Live Pan (Icons Section) */}
        <div className="flex p-2 space-x-2 bg-gray-100">
          <FaLaptopCode className="w-5 h-5 text-gray-500" />
          <FaAward className="w-5 h-5 text-gray-500" />
          <FaGlobe className="w-5 h-5 text-gray-500" />
        </div>

        {/* Course Title */}
        <div className="flex items-center p-4 space-x-3 text-white bg-blue-600">
          <img
            src="https://cb3img.s3.ap-south-1.amazonaws.com/img/iconDSA.webp"
            alt="C++"
            className="w-8 h-8"
          />
          <span className="text-lg font-semibold">
            Master Data Structures and Algorithms using C++
          </span>
        </div>

        {/* Course Details */}
        <div className="p-4">
          <h5 className="mb-2 text-lg font-semibold">This course includes</h5>
          <ul className="space-y-2">
            <li className="flex items-center text-sm">
              <FaAward className="mr-2 text-yellow-500" />
              350+ problems & 6 projects
            </li>
            <li className="flex items-center text-sm">
              <FaGlobe className="mr-2 text-green-500" />
              Foundation, Basics and Advanced modules
            </li>
            <li className="flex items-center text-sm">
              <BsFillPersonFill className="mr-2 text-blue-500" />
              Progress tracking and feedback
            </li>
            <li className="flex items-center text-sm">
              <FaGraduationCap className="mr-2 text-purple-500" />
              Certificate of Excellence/Completion
            </li>
            <li className="flex items-center text-sm">
              <FaGlobe className="mr-2 text-red-500" />
              Placement assistance
            </li>
            <li className="flex items-center text-sm">
              <FaAward className="mr-2 text-pink-500" />
              Doubt support
            </li>
            <li className="flex items-center text-sm">
              <FaLaptopCode className="mr-2 text-indigo-500" />
              Curriculum designed for beginners, No coding experience required
            </li>
          </ul>
        </div>

        {/* Course Button */}
        <div className="p-4">
          <a
            href="data-structures-and-algorithms-using-c-plus-plus.html"
            className="block w-full py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Show Course details
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
