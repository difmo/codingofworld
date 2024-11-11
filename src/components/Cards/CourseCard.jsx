import React from "react";
import {
  FaGlobe,
  FaLaptopCode,
  FaAward,
  FaGraduationCap,
  FaBrain,
  FaClipboard,
  FaLaptop,
} from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const CourseCard = ({ course }) => {
  return (
    <div className="py-4">
      <div className="overflow-hidden rounded-lg shadow-lg">
        {/* Course Title */}
        <div className="">
          <img
            src={course.image}
            alt={course.title}
            className="w-full bg-contain "
          />
        </div>

        {/* Course Details */}
        <div className="p-4">
          <h5 className="my-2  text-lg font-semibold">This course includes:</h5>
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
            <li className="flex items-center text-sm">
              <FaLaptop className="mr-2 text-blue-400" />
              {course.features.feature5}
            </li>
            <li className="flex items-center text-sm">
              <FaClipboard className="mr-2 text-gray-700" />
              {course.features.feature6}
            </li>
            <li className="flex items-center text-sm">
              <FaBrain className="mr-2 text-pink-400" />
              {course.features.feature7}
            </li>
          </ul>
        </div>

        {/* Course Button */}
        <div className="flex justify-between p-4">
          <a
            href={course.link}
            className="flex-shrink-0 px-4 py-2 text-center text-white rounded-lg bg-primary"
          >
            Start Now
          </a>
          <div className="ml-4">
            <button className="px-4 py-2 rounded">
              <span className=" text-xl">{course.price}</span>
              <s className="text-sm">{course.discount}</s>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
