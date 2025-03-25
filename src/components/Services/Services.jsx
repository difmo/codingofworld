import React from "react";
import { RiComputerLine } from "react-icons/ri";
import { CiMobile3 } from "react-icons/ci";
import { TbWorldWww } from "react-icons/tb";
import { IoMdHappy } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { MdDesignServices } from "react-icons/md";
const ServicesData = [
  {
    id: 1,
    title: "Web Development",
    link: "#",
    icon: <TbWorldWww />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "Mobile development",
    link: "#",
    icon: <CiMobile3 />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Software development",
    link: "#",
    icon: <RiComputerLine />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "IOT and Robotics",
    link: "#",
    icon: <IoMdHappy />,
    delay: 0.5,
  },
  {
    id: 5,
    title: "SEO optimization",
    link: "#",
    icon: <IoPulseOutline />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "Design",
    link: "#",
    icon: <MdDesignServices />,
    delay: 0.7,
  },
];

const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};
const Services = () => {
  return (
    <section className="bg-white dark:bg-dark transition-all duration-700 ease-in-out">
      <div className="container pt-16 pb-14">
        <h1 className="pb-10 text-4xl text-secondaryblue dark:text-secondaryblue-dark font-bold text-left">
          Skill-Boosting <span className="text-primary dark:text-primary-dark">Training</span> for Your Success
        </h1>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {ServicesData.map((service) => (
            <motion.div
              variants={SlideLeft(service.delay)}
              initial="initial"
              whileInView={"animate"}
              viewport={{ once: true }}
              key={service.id}
              className="border hover:shadow-primary hover:border-none rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white dark:hover:bg-dark hover:scale-105 duration-300 hover:shadow-2xl"
            >
              <div className="mb-4 text-4xl dark:text-white "> {service.icon}</div>
              <h1 className="px-3 text-lg font-semibold text-center dark:text-white">
                {service.title}
              </h1>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
