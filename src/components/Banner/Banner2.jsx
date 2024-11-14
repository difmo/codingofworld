import React from "react";
import BannerPng from "../../assets/banner.png";
import { motion } from "framer-motion";
import img from "../../assets/images/ourt.png";

const Banner2 = () => {
  return (
    <section>
      <div className="container py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="text-center md:text-left space-y-4 lg:max-w-[500px]">
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
              href="https://chat.whatsapp.com/E347xrhuUdkJWImKXDj4N5"
              className="primary-btn !mt-8"
            >
              Join Now
            </a>
          </div>
        </motion.div>
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={img}
            alt=""
            className="w-[550px] md:w-[700px] object-cover  "
          />
        </div>
      </div>
    </section>
  );
};

export default Banner2;
