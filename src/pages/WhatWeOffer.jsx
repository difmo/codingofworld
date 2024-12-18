// import React, { useRef } from "react";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import {
  FaMobileAlt,
  FaLaptopCode,
  FaDatabase,
  FaGamepad,
  FaCloud,
  FaShieldAlt,
  FaPaintBrush,
  FaTools,
  FaLink,
  FaBullhorn,
} from "react-icons/fa";

const featuresData = [
  {
    id: 1,
    icon: <FaMobileAlt size={48} />,
    title: "Mobile App Development",
    description:
      "Learn to create stunning mobile applications for both Android and iOS platforms.",
  },
  {
    id: 2,
    icon: <FaLaptopCode size={48} />,
    title: "Web Development",
    description:
      "Master the art of building responsive and dynamic websites using modern frameworks.",
  },
  {
    id: 3,
    icon: <FaDatabase size={48} />,
    title: "Data Science & AI",
    description:
      "Get hands-on experience with data analysis, machine learning, and AI technologies.",
  },
  {
    id: 4,
    icon: <FaGamepad size={48} />,
    title: "Game Development",
    description:
      "Dive into the world of game design and development with industry-standard tools.",
  },
  {
    id: 5,
    icon: <FaCloud size={48} />,
    title: "Cloud Computing",
    description:
      "Understand cloud architecture and services to deploy and manage applications.",
  },
  {
    id: 6,
    icon: <FaShieldAlt size={48} />,
    title: "Cybersecurity",
    description:
      "Learn essential security practices to protect applications and data from threats.",
  },
  {
    id: 7,
    icon: <FaPaintBrush size={48} />,
    title: "UI/UX Design",
    description:
      "Explore design principles to create user-friendly and visually appealing interfaces.",
  },
  {
    id: 8,
    icon: <FaTools size={48} />,
    title: "DevOps Practices",
    description:
      "Implement DevOps methodologies for continuous integration and deployment.",
  },
  {
    id: 9,
    icon: <FaLink size={48} />,
    title: "Blockchain Development",
    description:
      "Discover the fundamentals of blockchain technology and smart contracts.",
  },
  {
    id: 10,
    icon: <FaBullhorn size={48} />,
    title: "Digital Marketing",
    description:
      "Learn strategies to promote applications and websites effectively online.",
  },
];
export const FadeUp = (delay) => {
  return {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="relative px-4 mx-auto bg-cover max-w-8xl font-dmSans sm:px-6">
      <div className="pt-10 pb-10 md:pb-16" ref={ref}>
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h5 className="text-xl font-semibold text-red-600 capitalize">
            FEATURES
          </h5>
          <h1 className="md:text-[50px] text-[26px] xs:text-[24px] text-center font-bold tracking-wide mt-2">
            What we offer?
          </h1>
        </div>
        <div className="container flex justify-center mt-6">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 max-w-screen-2xl">
            {featuresData.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={FadeUp(0.2 * index)}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                className="flex p-4 border shadow dark:border-red-200   bg-[#ffffff] rounded-md"
              >
                <div className="flex items-start gap-x-6 ">
                  <span className="text-primary"> {feature.icon}</span>
                  <div>
                    <p className="font-semibold">{feature.title}</p>
                    <p className="text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
