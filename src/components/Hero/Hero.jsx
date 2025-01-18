import React, { useEffect, useState } from "react";
import Blob from "../../assets/blob.svg";
import HeroPng1 from "../../assets/headerimg/appdev.svg";
import HeroPng2 from "../../assets/headerimg/iotandrobo.svg";
import HeroPng3 from "../../assets/headerimg/webdev.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EventForm from "../Events/EventForm";
import ScrollToTop from "../ScrollTop";
import MyBot from "../Abot/Mybot";
import { FaHandshake, FaUserTie, FaLightbulb } from "react-icons/fa";
import TimerButton from "../TimerButton";

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
  
  const navigate = useNavigate();
 
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const images = [HeroPng1, HeroPng2, HeroPng3];
  const textOptions = [
    [
      "Master in-demand technologies with hands-on tutorials",
      " at Coding of World",
    ],
    ["Stay ahead in tech with expert-led lessons", " from Coding of World"],
    [
      "Explore AI, web development, and more",
      " with Coding of World’s training",
    ],
  ];

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

  const closeModal = () => {
    setIsModalOpen(false);
  };
const handleSubmit = async () => {
    if (!isUserLogin) {
        alert("Please login to submit the test.");
        return;
    }

    const studentRef = doc(db, "students", userUid);
    const studentDoc = await getDoc(studentRef);

    if (studentDoc.exists()) {
        const studentData = studentDoc.data();

        // Check if the student has already completed the test
        if (studentData.completed) {
            alert("You have already submitted the test.");
            return;
        }
    } else {
        // Handle case where the student document does not exist
        alert("Student data not found.");
        return;
    }

    const { name, email, mobnum, stream, answers } = userData;

    const marks = answers.reduce((total, answer, index) => {
        if (answer === questions[index].answer) {
            return total + 1;
        }
        return total;
    }, 0);

    try {
        // Do not set the completed status, just get and check
        console.log("Marks calculated:", marks);
        alert(`Test submitted! Your score is ${marks} out of ${questions.length}`);
        setCompleted(true); // Update UI or state after submission
    } catch (error) {
        console.error("Error submitting test:", error);
    }
};


  return (
    <section className="relative overflow-hidden bg-white">
      <ScrollToTop />
      <div className="container grid grid-cols-1 md:px-32 md:grid-cols-2">
        <div className="relative flex flex-col justify-center py-14 md:py-0 ">
          <div className="text-center md:text-left space-y-10 lg:max-w-[400px] z-10">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-2xl lg:text-3xl  font-bold !leading-snug"
            >
              <span className="text-secondaryblue font-anek_telugu">
                {textOptions[currentTextIndex][0]}
              </span>
              <span className="text-red-500 font-anek_telugu">
                {textOptions[currentTextIndex][1]}
              </span>
            </motion.h1>
            {/* 
            add span menu
            
            */}
            <div className="flex items-center md:items-start flex-col gap-4">
              {/* First sentence: Learning and AI-powered skills */}
              <div className="flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                <span className="font-medium text-gray-800">
                  Master cutting-edge tech and AI skills
                </span>
              </div>

              {/* Second sentence: Industry experts */}
              <div className="flex items-center gap-2">
                <FaUserTie className="text-blue-500" />
                <span className="font-medium text-gray-800">
                  Learn directly from top industry leaders
                </span>
              </div>

              {/* Third sentence: Partnered startups */}
              <div className="flex items-center gap-2">
                <FaHandshake className="text-green-500" />
                <span className="font-medium text-gray-800">
                  Partnered with 10+ startups and companies
                </span>
              </div>
            </div>

            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center md:items-start justify-center md:justify-start"
            >
              <div className="w-[312px]">   <TimerButton /> </div>

              <div className="flex items-center gap-4">

                <div className="flex items-center">


                  <button
                    onClick={() => navigate("/loginscreen")}

                    className="flex items-center gap-2 text-[16px] px-4 h-12 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                    Register for free
                  </button>
                </div>
                <div className="flex items-center ">
                  <button
                    onClick={() => navigate("/courses")}
                    className=" border-2 border-red-600 flex items-center gap-2 text-[16px] px-4 h-12 rounded-md bg-white text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ">
                    Explore courses
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-center ">
          <motion.img
            key={images[currentImage]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            src={images[currentImage]}
            alt="Hero Image"
            className="relative z-10"
          />
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            src={Blob}
            alt="Blob"
            className="absolute -bottom-32 w-[800px] md:w-[1500px] -z-[0] hidden md:block"
          />
        </div>
      </div>

      <div className="absolute top-0 w-full">
        {/* {isModalOpen && <EventForm onClose={closeModal} />} */}
      </div>

      <div className="z-20">
        <MyBot />
      </div>

      {/* Regular CSS for styles */}
      <style>
        {`
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
        `}
      </style>
    </section>
  );
};

export default Hero;
