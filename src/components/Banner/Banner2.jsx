import React from "react";
import { motion } from "framer-motion";
import img from "../../assets/images/ourt.png";

const Banner2 = () => {
  return (
    <section>
      <div className="container grid grid-cols-1 gap-8 overflow-hidden py-14 md:py-24 md:grid-cols-2 md:space-y-0">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="space-y-4 text-center md:text-left ">
            <h1 className="text-4xl font-bold !leading-snug">
              Join Our Community to Start your Journey
            </h1>
            <p className="text-dark">
              <p>
                React.js is a powerful library for building fast, scalable web
                apps with features like React Hooks, Context API, and React
                Router, ideal for dynamic UIs and cross-platform development
                with React Native.
              </p>
              <p>
                Data Structures and Algorithms (DSA) in C++ are essential for
                solving complex problems efficiently, optimizing performance,
                and excelling in competitive programming and software
                development.
              </p>

              <p>
                Python is a versatile, beginner-friendly language widely used in
                web development, data science, AI, and automation, known for its
                simplicity and robust libraries.
              </p>
            </p>
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

export default Banner2;
