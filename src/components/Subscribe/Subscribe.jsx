import React from "react";
import { FaBell } from "react-icons/fa";
import BgImage from "../../assets/bg.png";
import { motion } from "framer-motion";
const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Subscribe = () => {
  return (
    <section className="bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={bgStyle}
        className="container py-24 md:py-48"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col justify-center"
        >
          <div className="text-center space-y-4 lg:max-w-[530px] mx-auto">
            <h1 className="text-4xl font-bold !leading-snug">
            Join Thousands of Students Learning with Us
            </h1>
            <p>Real-world examples – Show practical applications.</p>
            <p>
              Interactive learning – Include coding challenges or case studies.
            </p>
            <p>
              Step-by-step tutorials – Break down complex topics into manageable
              chunks.
            </p>
            <a
              href="/internship"
              className="primary-btn !mt-8 inline-flex items-center gap-4 group"
            >
              Subscribe Now
              <FaBell className="duration-200 group-hover:animate-bounce group-hover:text-lg" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Subscribe;
