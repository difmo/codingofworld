import React, { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Blob from "../../assets/blob.svg";
import HeroPng1 from "../../assets/headerimg/appdev.svg";
import HeroPng2 from "../../assets/headerimg/iotandrobo.svg";
import HeroPng3 from "../../assets/headerimg/webdev.svg";
import { animate, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EventModel from "../Events/EventModel";
import EventForm from "../Events/EventForm";

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
  const [isModalOpen, setIsModalOpen] = useState(true); // State to control modal visibility

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const navigate = useNavigate();
  const images = [HeroPng1, HeroPng2, HeroPng3];
  const textOptions = [
    // "Intern Today, Lead Tomorrow",
    // "Where Education Meets Innovation.",
    // "Your Pathway to Digital Excellence ",
    // <EventModel onClick={openModal} />,
  ]; //
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="relative overflow-hidden bg-light">
      <div className=" container md:px-32 grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
        <div className="relative flex flex-col justify-center py-14 md:py-0 ">
          <div className="text-center md:text-left space-y-10 lg:max-w-[400px] z-10">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-2xl lg:text-4xl  font-bold !leading-snug"
            >
              <span className=" text-secondary">
              Join our Demo Class, Nov 20–22, 2024, for a hands-on session with expert trainers.

              </span>{" "}
            </motion.h1>
            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="flex justify-center md:justify-start"
            >
              <button
                onClick={openModal}
                className="flex items-center gap-2 primary-btn group blinking-btn"
              >
               join now
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
            className="relative z-10 "
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

      {/* <div className="absolute top-0 z-10 w-full">
        <EventModel onClick={openModal} />
      </div> */}
      <div className="absolute top-0 w-full">
        {isModalOpen && <EventForm onClose={closeModal} />}
      </div>


      <style jsx>{`
        /* Keyframe animation for blinking effect */
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        /* Button styles */
        .blinking-btn {
          animation: blink 1s infinite;
        }

        .primary-btn {
          background-color: #ff6b6b; /* Example primary button color */
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          font-weight: bold;
          text-transform: uppercase;
          transition: transform 0.3s ease;
        }

        .primary-btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default Hero;
