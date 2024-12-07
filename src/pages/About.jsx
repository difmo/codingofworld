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

export const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="py-4 about">
        <div className="container">
          <div className="py-12 text-center heading">
            <h1 className="text-3xl font-semibold text-black">
              Why An Scholercity Out Of The Ordinary
            </h1>
            <span className="block mt-2 text-sm">
              You don't have to struggle alone; you've got our assistance and
              help.
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <AboutCard
              color="bg-[#000]"
              icon={<FaPen size={50} />}
              title="400 Online Courses"
              desc="You don't have to struggle alone, you've "
            />
            <AboutCard
              color="bg-[#000]"
              icon={<FaBookmark size={50} />}
              title="Expert Instructors"
              desc="Learn from industry leaders."
            />
            <AboutCard
              color="bg-[#000]"
              icon={<FaClipboard size={50} />}
              title="Flexible Learning"
              desc="Study at your own pace."
            />
            <AboutCard
              color="bg-[#000]"
              icon={<FaLightbulb size={50} />}
              title="Certification"
              desc="Earn recognized certificates."
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
      <div className="text-white icon ">{props.icon}</div>
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
              Accelerate Your IT Career with Expert Training
            </h1>
            <span className="block mt-2 text-sm leading-6">
              At Coding of World, we’re dedicated to shaping the future of tech
              talent by providing immersive internship, training, and
              apprenticeship programs. Our mission is to prepare students to
              thrive in high-demand fields like web development, mobile app
              development, artificial intelligence (AI), machine learning (ML),
              and robotics. Our programs go beyond theory to focus on
              industry-relevant, practical skills. Through hands-on training,
              real-world projects, and mentorship from experienced
              professionals, students gain a deep understanding of cutting-edge
              technologies and best practices. We offer tailored career guidance
              to empower students with the tools, confidence, and direction
              needed to make an impact in today’s competitive job market. Join
              Coding of World to unlock your potential, upskill your future, and
              take the first step toward an exciting tech career. Explore over
              100,000 online courses, stay ahead with the latest skills, and
              embark on a journey to stand out in the tech industry!
            </span>
            <ul className="my-5">
              <li className="flex items-center gap-5 text-sm">
                <AiOutlineCheck className="text-green-500" /> Upskill your
                organization.
              </li>
              <li className="flex items-center gap-5 my-2 text-sm">
                <AiOutlineCheck className="text-green-500" />
                Access more than 10 online courses.
              </li>
              <li className="flex items-center gap-5 text-sm">
                <AiOutlineCheck className="text-green-500" />
                Learn the latest skills.
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
    </section>
  );
};
