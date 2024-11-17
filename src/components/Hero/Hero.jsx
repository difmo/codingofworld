import React, { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Blob from "../../assets/blob.svg";
import HeroPng1 from "../../assets/headerimg/appdev.svg";
import HeroPng2 from "../../assets/headerimg/iotandrobo.svg";
import HeroPng3 from "../../assets/headerimg/webdev.svg";
import { animate, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EventModel from "../Events/EventModel";

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
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

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const navigate = useNavigate();
  const images = [HeroPng1, HeroPng2, HeroPng3];
  const textOptions = ["Website", "Mobile App", "A Robot "]; //
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
    }, 3000);

    return () => clearInterval(textInterval);
  }, [textOptions.length]);
  return (
    <section className="relative overflow-hidden bg-light">
      <div className=" container md:px-32 grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
        <div className="relative flex flex-col justify-center py-14 md:py-0 ">
          <div className="text-center md:text-left space-y-10 lg:max-w-[400px] z-10">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-3xl lg:text-5xl  font-bold !leading-snug"
            >
              Let's Learn to build a{" "}
              <span className=" text-secondary">
                {textOptions[currentTextIndex]}
              </span>{" "}
              for your business
            </motion.h1>
            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="flex justify-center md:justify-start"
            >
              <button
                onClick={() => navigate("/contactus")}
                className="flex items-center gap-2 primary-btn group"
              >
                Get Started
                <IoIosArrowRoundForward className="text-xl duration-300 group-hover:translate-x-2 group-hover:-rotate-45" />
              </button>
            </motion.div>
          </div>
        </div>
        {/* Hero Image */}

        <div className="flex items-center justify-center ">
          <motion.img
            key={images[currentImage]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            src={images[currentImage]}
            alt=""
            className="w-[400px] xl:w-[600px] relative z-10 "
          />
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            src={Blob}
            alt=""
            className="absolute  -bottom-32 w-[800px] md:w-[1500px] -z-[0] hidden md:block"
          />
        </div>
      </div>

      <div className="absolute top-0 z-10 w-full"> 
        <EventModel />
       </div>
    </section>
  );
};

export default Hero;
