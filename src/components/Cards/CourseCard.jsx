import React from "react";
import icon1 from "../../assets/images/about.png";

const mydata = [
  {
    images: icon1,
    title: "Master Data Structures and Algorithms using C++ ",
  },
];
import {
  FaGlobe,
  FaLaptopCode,
  FaAward,
  FaGraduationCap,
} from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const CourseCard = () => {
  return (
    <div className="py-4 ">
      <div className="overflow-hidden bg-white rounded-lg shadow-lg h-">
        <div className="flex p-2 space-x-2 bg-gray-100">
          <FaLaptopCode className="w-auto h-5 text-gray-500" />
          <FaAward className="w-auto h-5 text-gray-500" />
          <FaGlobe className="w-auto h-5 text-gray-500" />
        </div>

        {/* Course Title className="flex items-center p-4 space-x-3 text-white bg-custom-gradient rounded-t-2xl  h-44"*/}
        {mydata.map((mydata, index) => (
          <div>
            <div className="h-60 ">
              <img
                src={icon1}
                className=" bg-contain h-72 w-full rounded-t-2xl "
              />
            </div>
            <h1 className=" relative font-bold  text-red-600 px-4 mb-5">
              {mydata.title}
            </h1>
          </div>
        ))}

        {/* <span className="text-lg font-semibold">
            Master Data Structures and Algorithms using C++
          </span> */}
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
              Foundation, Basics, and Advanced modules
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
        <div className="flex justify-between p-4">
          <a
            href="data-structures-and-algorithms-using-c-plus-plus.html"
            className="px-2 py-2 text-center text-white bg-primary rounded-lg flex-shrink-0"
          >
            Show Course details
          </a>
          <div className="ml-4">
            <button className="px-4 py-2 bg-gray-200 rounded text-xl">
              ₹. 4000
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
