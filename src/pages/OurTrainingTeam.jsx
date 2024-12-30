import React from "react";
import { motion } from "framer-motion";
import img from "../assets/images/ourt.png";
import card1 from "../assets/OurTrainingTeam/1.png";
import card2 from "../assets/OurTrainingTeam/2.png";
import card3 from "../assets/OurTrainingTeam/3.png";
import card4 from "../assets/OurTrainingTeam/4.png";
import card5 from "../assets/OurTrainingTeam/5.png";
import card6 from "../assets/OurTrainingTeam/re.jpg";
import card7 from "../assets/OurTrainingTeam/am.jpg";
const teamMembers = [
  {
    name: "Er. Dinesh Kumar",
    role: "Mobile App Developer (Android, iOS, Flutter, React Native)",
    image: card1,
  },
  {
    name: "Er. Aakash Gupta",
    role: "Mobile App Developer (Java, Flutter, iOS & Android, UI/UX Design)",
    image: card3,
  },
  {
    name: "Er. Vimal Raj",
    role: "Frontend Developer (Next.js, React.js, React Native)",
    image: card2,
  },
  {
    name: "Pritam Kumar Shram",
    role: "Software Developer (React Native, Flutter, Node.js)",
    image: card4,
  },
  {
    name: "Er. Aman Kumar",
    role: "Frontend Developer (HTML, CSS, JavaScript, React, UI/UX)",
    image: card5,
  },
  {
    name: "Ritanshu Shukla",
    role: "Data Analyst (Data Cleaning, Visualization, Predictive Analytics)",
    image: card6,
  },
  {
    name: "Amar Maurya",
    role: "Web Developer (React.js, Tailwind CSS, Firebase)",
    image: card7,
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
    <div className="px-4 pt-4 mx-auto max-w-8xl sm:px-6">
      <div className="px-4 py-16 mx-auto max-w-8xl sm:px-6">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center">
            <h6 className="mb-2 text-4xl text-center text-gray-800">
              Meet Our Expert Instructors
            </h6>
            <h1 className="mb-4 text-3xl font-bold text-center">
              Learn from{" "}
              <span className="text-primary">Industry Experts</span> Who Are
              Passionate About Teaching
            </h1>
            <p className="px-4 mb-6 text-lg text-center text-gray-700 md:px-64">
              Our instructors at Coding of World bring real-world expertise,
              offering hands-on guidance to help you stay ahead in the rapidly
              evolving tech industry.
            </p>
          </div>
        </div>
      </div>

      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            custom={index}
            className="text-[#ff5757] hover:text-[#0a2c5d] transition-transform transform bg-white rounded-lg shadow hover:scale-105 border p-4"
          >
            <div className="rounded-xl">
              <img
                src={member.image}
                alt={member.name}
                className="object-cover rounded-t-md"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-700 text-[17px]">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrainingTeam;
