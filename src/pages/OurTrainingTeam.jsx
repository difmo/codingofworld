import React from "react";
import { motion } from "framer-motion";
import img from "../assets/images/ourt.svg";
import card1 from "../assets/OurTrainingTeam/1.png";
import card2 from "../assets/OurTrainingTeam/2.png";
import card3 from "../assets/OurTrainingTeam/3.png";
import card4 from "../assets/OurTrainingTeam/4.png";
import card5 from "../assets/OurTrainingTeam/5.png";
const teamMembers = [
  {
    name: "Er.Dinesh Kumar",
    role: "Mobile App Developer | Specializing in Native & Cross-Platform Solutions (Android, iOS, Flutter, React-Native)",
    image: card1,
    bio: "Alice has over 4 + years of experience in mobile app development and is passionate about teaching.",
  },
  {
    name: "Er.Aakash Gupta",
    role: "Mobile App Developer , Kotlin , Java & flutter ",
    image: card3,
    bio: "Bob specializes in full-stack web development and loves sharing his knowledge with students.",
  },
  {
    name: "Er.Vimal Raj",
    role: "Frontend Developer , Next js , React Native , React js , JavaScript , Tailwind CSS , bootstrap , HTML5 & API Integration",
    image: card2,
    bio: "Charlie is a data scientist with a knack for explaining complex topics in simple terms.",
  },
  {
    name: "Pritam Kumar Shram",
    role: "Software Developer ,React Native, Flutter & Node.js ,Databases (NoSQL, MongoDB, Firebase) , Problem-solving Enthusiast with Strong Foundations in Data Structures & Algorithms",
    image: card4,
    bio: "Diana is an experienced designer who focuses on creating user-friendly interfaces.",
  },
  {
    name: "Er.Aman kumar",
    role: " Front-End Developer , Transforming Ideas into Stunning, User-Centric Interfaces , Expert in HTML, CSS, JavaScript & React",
    image: card5,
    bio: "Diana is an experienced designer who focuses on creating user-friendly interfaces.",
  },
  {
    name: "Diana Prince",
    role: "UI/UX Design Trainer",
    image: card1,
    bio: "Diana is an experienced designer who focuses on creating user-friendly interfaces.",
  },
  {
    name: "Diana Prince",
    role: "UI/UX Design Trainer",
    image: card2,
    bio: "Diana is an experienced designer who focuses on creating user-friendly interfaces.",
  },
  {
    name: "Diana Prince",
    role: "UI/UX Design Trainer",
    image: card3,
    bio: "Diana is an experienced designer who focuses on creating user-friendly interfaces.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.2 },
  }),
};

const TrainingTeam = () => {
  return (
    <div className="px-4 pt-4 mx-auto max-w-8xl sm:px-6 ">
      <div className="px-4 py-16 mx-auto max-w-8xl sm:px-6">
        <div className="flex flex-col">
          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h6 className="mb-2 text-4xl text-center text-gray-800">
              OUR INSTRUCTORS
            </h6>
            <h1 className="mb-4 text-3xl font-bold text-center">
              Learn from{" "}
              <span className="text-primary">real-world experts</span> who love
              to teach
            </h1>
            <p className="mb-6 text-lg text-center text-gray-700">
              Udemy Business instructors bring their experience to the online
              classroom.
            </p>
            <div className="flex justify-center">
              <a href="#" target="_self" rel="noopener noreferrer">
                <button className="px-4 py-2 font-semibold text-white transition duration-300 rounded shadow bg-primary hover:bg-primary/40">
                  View all course topics
                </button>
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center">
            <img
              className="h-auto max-w-full"
              src={img}
              alt="Instructors"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <h2 className="mb-10 text-3xl font-bold text-center">
        Meet Our Training Team
      </h2>
      <div className="container grid grid-cols-1 gap-6 py-10 md:grid-cols-2 lg:grid-cols-4 ">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            custom={index}
            className=" text-[#ff5757] hover:text-[#0a2c5d] transition-transform transform bg-white rounded-lg shadow hover:scale-105"
          >
            <div className="rounded-xl">
              <img
                src={member.image}
                alt={member.name}
                className="object-cover rounded-t-md"
              />
            </div>
            <div className="p-4 ">
              <h3 className="text-xl font-semibold ">{member.name}</h3>
              <p className="text-gray-700 text-[17px]">{member.role}</p>
              <p className="mt-2 text-gray-600">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrainingTeam;
