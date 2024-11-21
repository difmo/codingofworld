import React from "react";
import { courses } from "../assets/data/dummydata";
import { FaBook } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/Cards/CourseCard";
import img1 from "../assets/Coures/1.jpg";
import img2 from "../assets/Coures/7.jpg";
import img3 from "../assets/Coures/4.jpg";
import AlldetailCourese from "./AlldetailCourese";

export const Courses = () => {
  const navigate = useNavigate();

  return (
    <section className="courses bg-[#F3F4F8] pt-4">
      
      <div className="w-4/5 m-auto">
        <div className="py-16 heading">
          <h1 className="text-3xl font-semibold text-black">
            Find The Right <br />
            Online Course For You With Certificates by{" "}
            <span className="text-primary">Diffmo Technologies</span>
          </h1>
          <span className="block mt-2 text-sm">
            You don't have to struggle alone, you've got our assistance and
            help.
          </span>
        </div>

        {/* First grid for displaying courses data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {coursesData.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

        {/* Second grid for displaying additional courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {courses.map((item) => (
            <div
              onClick={() => navigate(item.path)}
              key={item.id}
              className="relative bg-white shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative w-full overflow-hidden rounded-t-lg images hover:bg-red-600">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="object-cover w-full h-full transition duration-300 ease-in-out delay-150 rounded-t-lg cursor-pointer"
                />
              </div>
              {/* Uncomment and modify if you want to display course title */}
              {/* <div className="p-3 text">
              <h3 className="h-10 my-4 font-medium text-black">
                {item.title}
              </h3>
            </div> */}

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
    // title: "Master Data Structures and Algorithms using C++",
    image: img1,
    features: {
      feature1: "350+ problems & 6 projects",
      feature2: "Foundation, Basics, and Advanced modules",
      feature3: "Progress tracking and feedback",
      feature4: "Certificate of Excellence/Completion",
      feature5: "Placement assistance",
      feature6: "Doubt support",
      feature7:
        "Curriculum designed for beginners, No coding experience required",
    },
    price: " ₹3999 ",
    discount: "₹4999",
    link: "/internshipform",
  },
  {
    // title: "Web Development with HTML, CSS, and React, Nodejs , Express js ",
    image: img2,
    features: {
      feature1: "50+ projects & 5 assignments",
      feature2: "From basics to advanced frontend development",
      feature3: "Complete front-end web development curriculum",
      feature4: "Placement assistance included",
      feature5: "Placement assistance",
      feature6: "Doubt support",
      feature7:
        "Curriculum designed for beginners, No coding experience required",
    },
    price: " ₹4599 ",
    discount: "₹5999",
    link: "/internshipform",
  },
  {
    // title:
    // "Introduction to Python for Data Science Introduction to Python for Data Science",
    image: img3,
    features: {
      feature1: "Hands-on projects in Python",
      feature2: "Introduction to data analysis and visualization",
      feature3: "Python programming and libraries",
      feature4: "Online workshops with experts",
      feature5: "Placement assistance",
      feature6: "Doubt support",
      feature7:
        "Curriculum designed for beginners, No coding experience required",
    },
    price: "₹4599 ",
    discount: " ₹5599",
    link: "/internshipform",
  },
];
