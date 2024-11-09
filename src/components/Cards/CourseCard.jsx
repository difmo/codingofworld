import React from "react";
import { FaGlobe, FaLaptopCode, FaAward, FaGraduationCap } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const CourseCard = ({ course }) => {
  return (
    <div className="py-4">
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex p-2 space-x-2 bg-gray-100">
          <FaLaptopCode className="w-auto h-5 text-gray-500" />
          <FaAward className="w-auto h-5 text-gray-500" />
          <FaGlobe className="w-auto h-5 text-gray-500" />
        </div>

        {/* Course Title */}
        <div className="h-60">
          <img
            src={course.image}
            alt={course.title}
            className="w-full bg-contain h-72 rounded-t-2xl"
          />
        </div>
        <h1 className="relative px-4 mb-5 font-bold text-white">
          {course.title}
        </h1>

        {/* Course Details */}
        <div className="p-4">
          <h5 className="mb-2 text-lg font-semibold">This course includes:</h5>
          <ul className="space-y-2">
            <li className="flex items-center text-sm">
              <FaAward className="mr-2 text-yellow-500" />
              {course.features.feature1}
            </li>
            <li className="flex items-center text-sm">
              <FaGlobe className="mr-2 text-green-500" />
              {course.features.feature2}
            </li>
            <li className="flex items-center text-sm">
              <BsFillPersonFill className="mr-2 text-blue-500" />
              {course.features.feature3}
            </li>
            <li className="flex items-center text-sm">
              <FaGraduationCap className="mr-2 text-purple-500" />
              {course.features.feature4}
            </li>
          </ul>
        </div>

        {/* Course Button */}
        <div className="flex justify-between p-4">
          <a
            href={course.link}
            className="flex-shrink-0 px-2 py-2 text-center text-white rounded-lg bg-primary"
          >
             Start Now
          </a>
          <div className="ml-4">
            <button className="px-4 py-2 text-xl bg-gray-200 rounded">
              {course.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
