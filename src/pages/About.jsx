import React from "react";
import aboutImg from "../assets/images/about.jpg";
import aboutImgBanner from "../assets/images/about-banner.jpg";
import imgs from "../assets/images/join1.png";
import {
  FaBookDead,
  FaBookmark,
  FaClipboard,
  FaLightbulb,
  FaPen,
} from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import InternshipForm from "./IntershipForm";
import TrainingTeam from "./OurTrainingTeam";

export const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="py-4 about">
        <div className="container">
          <div className="py-12 text-center heading">
            <h1 className="text-3xl font-semibold text-black">
              Why Choose Coding of World: A Unique Learning Experience
            </h1>
            <span className="block mt-2 text-sm">
              We believe in empowering students with knowledge and practical experience. With us, you're never alone in your learning journey!
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <AboutCard
              color="bg-[#000]"
              icon={<FaPen size={50} />}
              title="400+ Online Courses"
              desc="Gain access to a wide range of courses across multiple domains."
            />
            <AboutCard
              color="bg-[#000]"
              icon={<FaBookmark size={50} />}
              title="Expert Instructors"
              desc="Learn from industry leaders with years of experience."
            />
            <AboutCard
              color="bg-[#000]"
              icon={<FaClipboard size={50} />}
              title="Flexible Learning"
              desc="Study at your own pace, whenever it suits you."
            />
            <AboutCard
              color="bg-[#000]"
              icon={<FaLightbulb size={50} />}
              title="Certification"
              desc="Earn industry-recognized certificates to boost your career."
            />
          </div>
        </div>
      </section>
      <AboutContent />
    </>
  );
};

export const AboutCard = (props) => {
  return (
    <div
      className={`box shadow-md p-5 py-8 rounded-md text-white ${props.color} cursor-pointer transition ease-in-out delay-150 hover:-translate-y-4 duration-300`}
    >
      <div className="text-white icon">{props.icon}</div>
      <div className="mt-5 text">
        <h4 className="my-3 text-lg font-semibold">{props.title}</h4>
        <p className="text-sm">{props.desc}</p>
      </div>
    </div>
  );
};

export const AboutContent = () => {
  return (
    <section className="mb-16">
      <div className="container flex flex-col md:flex-row md:gap-8">
        <div className="relative w-full left md:w-1/3">
          <img src={aboutImg} alt="About" className="rounded-xl" />
        </div>
        <div className="w-full right md:w-2/3 md:mt-16">
          <div className="heading">
            <h1 className="text-3xl font-semibold text-black">
              Empowering Future Tech Leaders with Hands-on Training
            </h1>
            <span className="block mt-2 text-sm leading-6">
              At Coding of World, we are committed to shaping the next generation of tech innovators. We offer immersive internship, training, and apprenticeship programs tailored for the ever-evolving fields of web development, mobile app development, AI, ML, and robotics. Our mission is to provide students with not just theoretical knowledge, but with the practical, industry-relevant skills required to excel in a competitive job market.
            </span>
            <ul className="my-5">
              <li className="flex items-center gap-5 text-sm">
                <AiOutlineCheck className="text-green-500" /> Upskill your workforce with cutting-edge technologies.
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
            <button
              onClick={() => navigate("/internshipform")}
              className="px-5 py-2 text-sm border border-gray-300 rounded-md"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
      <TrainingTeam />
    </section>
  );
};

