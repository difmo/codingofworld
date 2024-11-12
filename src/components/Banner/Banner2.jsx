import React from "react";
import BannerPng from "../../assets/banner.png";
import { motion } from "framer-motion";
import img from "../../assets/headerimg/2.svg";

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
          <div className="text-center md:text-left space-y-4 lg:max-w-[450px]">
            <h1 className="text-4xl font-bold !leading-snug">
              Join Our Community to Start your Journey
            </h1>
            <p className="text-dark">
              <p>
                Python: Great for beginners. Used in web development, data
                science, automation, AI, and more.
              </p>
              <p>
                JavaScript: Essential for web development. Learn it if you're
                interested in building websites or web applications.
              </p>
              <p>
                Java: A solid choice for software development, especially for
                large-scale applications.
              </p>
              <p>
                C++: If you're interested in systems programming or game
                development.
              </p>
              <p>
                Get access to exclusive tutorials, guides, and resources curated
                by experienced developers. Stay up-to-date with React best
                practices and cutting-edge features like React hooks, Context
                API, React Router, and React Query.
              </p>
            </p>
            <a
              href="https://chat.whatsapp.com/FQSKgJ5f1eIAhlyF5sVym0"
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
            className="w-[550px] md:max-w-[650px] object-cover  "
          />
        </div>
      </div>
    </section>
  );
};

export default Banner2;
