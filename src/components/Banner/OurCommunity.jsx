import React from "react";
import { motion } from "framer-motion";
import img from "../../assets/images/ourt.png";

const OurCommunity = () => {
  return (
    <section className="bg-white dark:bg-dark transition-all duration-700 ease-in-out">
      <div className="container grid grid-cols-1 gap-8 overflow-hidden py-14 md:py-24 md:grid-cols-2 md:space-y-0">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="space-y-4 text-center md:text-left ">
            <h1 className="text-4xl font-bold text-secondaryblue dark:text-white !leading-snug">
              Join <span className="text-primary"> Our Community</span> to Start your Journey
            </h1>
            {/* Fixed issue: Replaced the outer <p> with a <div> */}
            <div className="text-dark dark:text-white">
              <p>
              Learn & Grow: Master web development, mobile apps, AI/ML, and robotics with expert-led training.
              </p>
              <p>
              Hands-On Experience: Gain real-world skills through internships and projects.
              </p>
              <p>
              Launch Your Career: Benefit from 100% placement assistance and turn your passion into a profession.
              </p>
            </div>
            <a
              href=" https://chat.whatsapp.com/FwZdLFOAPIZDf5xCmvt7RO "
              className="primary-btn !mt-8"
            >
              Join Now
            </a>
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            src={img}
            alt="Animated Image"
            className="object-contain w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default OurCommunity;
