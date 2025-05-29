import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/images/about.jpg";
import { FaBookmark, FaClipboard, FaLightbulb, FaPen } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TrainingTeam from "./OurTrainingTeam";
import RouteConstants from "@/utils/RouteConstants";

// Framer Motion Variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <>
      <section className="py-14 about bg-white dark:bg-dark transition-all duration-700 ease-in-out">
        <div className="container">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-12 text-center heading"
          >
            <h1 className="text-3xl font-semibold dark:text-gray-50 text-black">
              Why Choose Coding of World: A Unique Learning Experience
            </h1>
            <span className="block mt-2 dark:text-gray-100 text-sm">
              We believe in empowering students with knowledge and practical
              experience. With us, you're never alone in your learning journey!
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <AboutCard
              color="bg-red-500"
              icon={<FaPen size={50} />}
              title="Online Mode Courses"
              desc="Gain access to a wide range of courses across multiple domains."
              delay={0}
            />
            <AboutCard
              color="bg-red-500"
              icon={<FaBookmark size={50} />}
              title="Expert Instructors"
              desc="Learn from industry leaders with years of experience."
              delay={0.1}
            />
            <AboutCard
              color="bg-red-500"
              icon={<FaClipboard size={50} />}
              title="Flexible Learning"
              desc="Study at your own pace, whenever it suits you."
              delay={0.2}
            />
            <AboutCard
              color="bg-red-500"
              icon={<FaLightbulb size={50} />}
              title="Certification"
              desc="Earn industry-recognized certificates to boost your career."
              delay={0.3}
            />
          </div>
        </div>
      </section>
      <AboutContent />
    </>
  );
};

// Motion-enhanced AboutCard
export const AboutCard = ({ icon, title, desc, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`box shadow-md p-5 py-8 rounded-md text-white ${color} cursor-pointer transition ease-in-out delay-150 hover:-translate-y-4 duration-300`}
    >
      <div className="text-white icon">{icon}</div>
      <div className="mt-5 text">
        <h4 className="my-3 text-lg font-semibold">{title}</h4>
        <p className="text-sm">{desc}</p>
      </div>
    </motion.div>
  );
};

// Motion-enhanced AboutContent
export const AboutContent = () => {
  const navigate = useNavigate();
  return (
    <section className="pb-16 dark:bg-dark dark:text-white transition-all duration-700 ease-in-out">
      <div className="container flex flex-col md:flex-row md:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full left md:w-1/3"
        >
          <img src={aboutImg} alt="About" className="rounded-xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full right md:w-2/3 md:mt-16"
        >
          <div className="heading">
            <h1 className="text-3xl font-semibold dark:text-white text-black">
              Empowering Future Tech Leaders with Hands-on Training
            </h1>
            <span className="block mt-2 text-sm leading-6">
              At Coding of World, we are committed to shaping the next
              generation of tech innovators. We offer immersive internship,
              training, and apprenticeship programs tailored for the
              ever-evolving fields of web development, mobile app development,
              AI, ML, and robotics. Our mission is to provide students with not
              just theoretical knowledge, but with the practical,
              industry-relevant skills required to excel in a competitive job
              market.
            </span>

            <ul className="py-5">
              <li className="flex items-center gap-5 text-sm">
                <AiOutlineCheck className="text-green-500" /> Upskill your
                workforce with cutting-edge technologies.
              </li>
              <li className="flex items-center gap-5 my-2 text-sm">
                <AiOutlineCheck className="text-green-500" />
                Access over 10,000 online courses at your convenience.
              </li>
              <li className="flex items-center gap-5 text-sm">
                <AiOutlineCheck className="text-green-500" />
                Learn from seasoned professionals and industry experts.
              </li>
            </ul>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(RouteConstants.MAINROUTE.INTERNSHIPFORM)}
              className="px-6 py-3 text-sm border text-primary bg-red-100 hover:bg-red-500 hover:text-white hover:shadow-md hover:shadow-yellow-200 border-gray-300 rounded-md w-32 flex justify-center cursor-pointer"
            >
              Apply Now
            </motion.div>
          </div>
        </motion.div>
      </div>
      <TrainingTeam />
    </section>
  );
};

export default About;
