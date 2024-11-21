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
    name: "Er.Dinesh Kumar",
    role: "Mobile App Developer (Android, iOS, Flutter, React Native).",
    image: card1,
    // bio: "Alice has over 4 + years of experience in mobile app development and is passionate about teaching.",
  },
  {
    name: "Er.Aakash Gupta",
    role: "Mobile App Developer(Java, Flutter, iOS & Android , UI/UX design ).",
    image: card3,
  },
  {
    name: "Er.Vimal Raj",
    role: "Frontend Developer proficient in Next.js, React.js, React Native.",
    image: card2,
  },
  {
    name: "Pritam Kumar Shram",
    role: "Software Developer specializing in React Native, Flutter, Node.js.",
    image: card4,
  },
  {
    name: "Er.Aman kumar",
    role: "Front-End Developer(HTML, CSS, JavaScript, React, UI/UX, Responsive Design).",
    image: card5,
  },
  {
    name: "Ritanshu Shukla ",
    role: " Data Analyst Skilled in Data Cleaning, Visualization, and Predictive Analytics ",
    image: card6,
  },
  {
    name: "Amar Maurya",
    role: "Web Applications with React.js, Tailwind CSS, and Firebase at Difmo Technologies ",
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
            <p className="mb-6 px-4 md:px-64 text-lg text-center text-gray-700">
              Difmo Technologies instructors offer real-world tech expertise,
              teaching in-demand skills like programming, cybersecurity, and
              data science to help learners stay ahead in the industry.
            </p>
            {/* <div className="flex justify-center">
              <a href="#" target="_self" rel="noopener noreferrer">
                <button className="px-4 py-2 font-semibold text-white transition duration-300 rounded shadow bg-primary hover:bg-primary/40">
                  View all course topics
                </button>
              </a>
            </div> */}
          </div>

          {/* Image Section */}
          {/* <div className="flex items-center justify-center">
            <img
              className="h-auto w-full"
              src={img}
              alt="Instructors"
              loading="lazy"
            />
          </div> */}
        </div>
      </div>
      <h2 className="mb-10 text-3xl font-bold text-center">
        Meet Our Training Team
      </h2>
      <div className="container grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-3  ">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            custom={index}
            className=" text-[#ff5757] hover:text-[#0a2c5d] transition-transform transform bg-white rounded-lg shadow hover:scale-105 border p-4"
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
