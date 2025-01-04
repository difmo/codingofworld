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
    title: "Mobile App Development Mastery",
    description:
      "Dive deep into mobile app development for Android and iOS! Learn how to design sleek, user-friendly applications, master UI/UX design principles, and deploy apps that make an impact. Build apps that not only work but delight users and perform seamlessly.",
  },
  {
    id: 2,
    icon: <FaLaptopCode size={48} />,
    title: "Build the Web: Become a Full-Stack Web Developer",
    description:
      "Unlock the secrets to creating modern, dynamic websites with the latest technologies. Learn everything from front-end frameworks like React and Next.js to back-end integrations using tools like Google Cloud and Angular. Create responsive, high-performance websites that captivate your audience.",
  },
  {
    id: 3,
    icon: <FaDatabase size={48} />,
    title: "Data Science & AI: Transform the Future with Data",
    description:
      "Master the powerful combination of data science and artificial intelligence. From data analysis to building intelligent machine learning models, equip yourself with the skills to create AI-driven solutions that transform industries and pave the way for the future.",
  },
  {
    id: 4,
    icon: <FaGamepad size={48} />,
    title: "Game Development: Design, Develop, Play",
    description:
      "Turn your passion for gaming into reality. Learn to design and develop immersive games using industry-standard tools like Unity and Unreal Engine. From concept to gameplay, create captivating experiences that will take your gaming ideas to the next level.",
  },
  {
    id: 5,
    icon: <FaCloud size={48} />,
    title: "Cloud Computing: Scale Applications to New Heights",
    description:
      "Discover how cloud technology is revolutionizing modern applications. Learn to design scalable, secure cloud-based solutions that leverage platforms like AWS, Google Cloud, and Azure. Ensure high availability, performance, and integration of your applications in the cloud.",
  },
  {
    id: 6,
    icon: <FaShieldAlt size={48} />,
    title: "Cybersecurity: Defend the Digital World",
    description:
      "Become a cybersecurity expert and learn the techniques needed to protect applications and sensitive data from cyber threats. Gain hands-on experience in securing networks, implementing best practices for risk management, and defending against evolving security challenges.",
  },
  {
    id: 7,
    icon: <FaPaintBrush size={48} />,
    title: "UI/UX Design: Craft Beautiful User Experiences",
    description:
      "Master the art of UI/UX design and create visually appealing, intuitive interfaces that users love. Learn the best practices, principles, and tools to design stunning websites and apps that offer seamless, engaging, and user-centric experiences.",
  },
  {
    id: 8,
    icon: <FaTools size={48} />,
    title: "DevOps Practices: Accelerate Development & Delivery",
    description:
      "Streamline your development process with DevOps practices. Learn to automate workflows, enhance collaboration, and implement continuous integration and delivery. Achieve faster software releases, higher quality, and better collaboration between development and operations teams.",
  },
  {
    id: 9,
    icon: <FaLink size={48} />,
    title: "Blockchain Development: Revolutionizing Digital Innovation",
    description:
      "Explore the world of blockchain technology and unlock its potential. Learn to develop decentralized applications (dApps) and create smart contracts that empower the next wave of digital transformation, from finance to supply chains.",
  },
  {
    id: 10,
    icon: <FaBullhorn size={48} />,
    title: "Digital Marketing: Drive Traffic & Grow Your Brand",
    description:
      "Master the art of online marketing with proven strategies that drive traffic and engage audiences. Learn SEO, content marketing, social media campaigns, and paid advertising to effectively promote websites, applications, and brands to a global audience. Expand your reach and grow your business.",
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
          <h5 className="text-xl font-semibold text-primary capitalize">FEATURES</h5>
          <h1 className="md:text-4xl text-[26px] text-secondaryblue xs:text-[24px] text-center font-bold tracking-wide mt-2">
            What We <span className="text-primary">Offer</span>?
          </h1>
        </div>
        <div className="container flex justify-center mt-6">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-screen-2xl">
            {featuresData.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={FadeUp(0.2 * index)}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                className="flex p-6 transition-all duration-300 transform bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-start gap-x-6">
                  <div className="p-4 rounded-full bg-gradient-to-br from-red-500 to-red-600">
                    <span className="text-white">{feature.icon}</span>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">{feature.title}</p>
                    <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
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
