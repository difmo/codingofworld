import { useState } from "react";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import SectionTitle from "./SectionTitle";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section id="pricing" className="relative  -z-50  md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="The tech industry is constantly evolving, with new innovations shaping the future. Staying updated with the latest trends and continuously developing skills is essential for success in today's fast-paced world."
          center
          width="665px"
        />

        <div className="w-full">
          <div
            className="wow fadeInUp mb-8 flex justify-center md:mb-12 lg:mb-16"
            data-wow-delay=".1s"
          >
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "pointer-events-none text-primary"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Monthly
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${
                    isMonthly ? "" : "translate-x-full"
                  } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "text-dark dark:text-white"
                  : "pointer-events-none text-primary"
              } ml-4 cursor-pointer text-base font-semibold`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Beginner"
            price={isMonthly ? "1,000" : "20,000"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Perfect for those just starting out with IT skills."
          >
            <OfferList
              text="Introduction to Computer Science"
              status="active"
            />
            <OfferList text="Basic Programming Concepts" status="active" />
            <OfferList text="Computer Hardware Basics" status="active" />
            <OfferList text="Email & Communication Tools" status="active" />
            <OfferList
              text="Introduction to Internet Technologies"
              status="active"
            />
            <OfferList text="Basic Networking Concepts" status="active" />
            <OfferList text="Data Entry & Office Tools" status="active" />
            <OfferList text="Introductory Web Development" status="inactive" />
            <OfferList text="One-on-One Tutoring" status="inactive" />
            <OfferList text="Access to Premium Labs" status="inactive" />
            <OfferList
              text="Basic Digital Marketing Concepts"
              status="inactive"
            />
            <OfferList
              text="Basic Cloud Computing Concepts"
              status="inactive"
            />
            {/* oihibo */}
          </PricingBox>
          <PricingBox
            packageName="Intermediate"
            price={isMonthly ? "2,500" : "27,000"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="For those looking to expand their IT knowledge and skills."
          >
            <OfferList
              text="Advanced Programming (Python, Java)"
              status="active"
            />
            <OfferList text="Networking Essentials" status="active" />
            <OfferList text="Database Management" status="active" />
            <OfferList text="Cybersecurity Fundamentals" status="active" />
            <OfferList text="Personalized Course Feedback" status="active" />
            <OfferList
              text="Lifetime Access to Course Materials"
              status="active"
            />
            <OfferList text="Introduction to Data Science" status="inactive" />
            <OfferList
              text="Web Development with HTML & CSS"
              status="inactive"
            />
            <OfferList text="Cloud Services (AWS, Azure)" status="inactive" />
            <OfferList
              text="Advanced Networking & Protocols"
              status="inactive"
            />
            <OfferList text="Project Management for IT" status="inactive" />
            <OfferList text="Business IT Strategies" status="inactive" />
          </PricingBox>
          <PricingBox
            packageName="Professional"
            price={isMonthly ? "3,500" : "35,000"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="For professionals ready to master IT and advance their careers."
          >
            <OfferList
              text="Master Courses in Cloud Computing"
              status="active"
            />
            <OfferList
              text="Advanced Cybersecurity Techniques"
              status="active"
            />
            <OfferList text="IT Project Management" status="active" />
            <OfferList text="Data Science and AI" status="active" />
            <OfferList
              text="One-on-One Mentoring with Experts"
              status="active"
            />
            <OfferList
              text="Access to Industry Events & Webinars"
              status="active"
            />
            <OfferList
              text="Machine Learning for Professionals"
              status="active"
            />
            <OfferList text="DevOps Fundamentals and Tools" status="active" />
            <OfferList
              text="Blockchain Development and Application"
              status="active"
            />
            <OfferList
              text="Advanced Cloud Architecture & Design"
              status="inactive"
            />
            <OfferList
              text="AI & ML Certification Exam Preparation"
              status="inactive"
            />
            <OfferList
              text="Exclusive Networking Opportunities"
              status="inactive"
            />
          </PricingBox>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#FF4F43" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4F43" />
              <stop offset="1" stopColor="#FF4F43" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
