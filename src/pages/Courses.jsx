import React from "react";
import { courses } from "../assets/data/dummydata";
import { FaBook } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/Cards/CourseCard";




export const Courses = () => {
  const navigate = useNavigate();
  return (
    <section className="courses bg-[#F3F4F8] pt-4">
      <div className="w-4/5 m-auto">
        <div className="mb-16 heading">
          <h1 className="text-3xl font-semibold text-black">
            Find The Right <br />
            Online Course For You With Certificates by{" "}
            <span className="text-primary">Diffmo Technologies</span>
          </h1>
          <span className="block mt-2 text-sm">
            you don't have to struggle alone, you've got our assistance and
            help. 
          </span>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {coursesData.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))} 
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {courses.map((item) => (
            <div
              onClick={() => navigate(item.path)}
              key={item.id}
              className="border rounded-lg cursor-pointer box shadow-shadow1"
            >
              <div className="relative w-full h-40 overflow-hidden rounded-t-lg images">
                <img
                  src={item.cover}
                  alt=""
                  className="object-cover w-full h-full transition duration-300 ease-in-out delay-150 rounded-t-lg cursor-pointer hover:scale-125"
                />
                <div className="absolute top-0 flex gap-4 m-3 categ left-2">
                  <span className="text-[14px] bg-primary p-1 px-3 text-white rounded-[5px] shadow-md">
                    From Experts{" "}
                  </span>
                  <span className="text-[14px] bg-black p-1 px-3 text-white rounded-[5px] shadow-md">
                    Diffmo Tech{" "}
                  </span>
                </div>
              </div>
              <div className="p-3 text">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaBook />
                    <span className="text-[14px] ml-2"> 10 lessons</span>
                  </div>
                  <div className="flex items-center">
                    <AiFillStar className="text-orange-500" />
                    <span className="text-[14px] ml-2"> 4.50(2)</span>
                  </div>
                </div>
                <h3 className="h-10 my-4 font-medium text-black">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center justify-between p-3 border-t border-gray-200">
                <span className="text-sm text-primary">Free</span>
                <NavLink to="/" className="text-[14px] ml-2 flex items-center">
                  Know Details <HiOutlineArrowNarrowRight />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




const coursesData = [
  {
    title: "Master Data Structures and Algorithms using C++",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmVeLTyGkk6Cs7HbuWQEMJ8LNsc268Vg-LFw&s", // Replace with actual image URL
    features: {
      feature1: "350+ problems & 6 projects",
      feature2: "Foundation, Basics, and Advanced modules",
      feature3: "Progress tracking and feedback",
      feature4: "Certificate of Excellence/Completion",
    },
    price: "₹4000",
    link: "/internshipform",
  },
  {
    title: "Web Development with HTML, CSS, and React, Nodejs , Express js ",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqYohXPmtLSchDoDq_QN1HxZmEpBYXlngBqw&s", // Replace with actual image URL
    features: {
      feature1: "50+ projects & 5 assignments",
      feature2: "From basics to advanced frontend development",
      feature3: "Complete front-end web development curriculum",
      feature4: "Placement assistance included",
    },
    price: "₹5000",
    link: "/internshipform",
  },
  {
    title: "Introduction to Python for Data Science",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/1/BB/MM/EE/16435775/python-training-service.png", // Replace with actual image URL
    features: {
      feature1: "Hands-on projects in Python",
      feature2: "Introduction to data analysis and visualization",
      feature3: "Python programming and libraries",
      feature4: "Online workshops with experts",
    },
    price: "₹4500",
    link: "/internshipform",
  },
];
