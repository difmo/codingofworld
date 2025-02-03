import React from "react";
import SectionTitle from "../Pricing/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData = [
  {
    id: 1,
    name: "Ankesh Yadav",
    designation: "Student @TechAcademy",
    content:
      "The creative environment and collaborative approach at Difmo Technologies are unmatched. The team goes above and beyond to design user-centric products. It's inspiring to work with such a dedicated group of professionals.",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjVzuIUMUvjOUUi2XZGAvl73ydd12j8syOKSTAqW5T9hSTK-bciU=w83-h83-p-rp-mo-ba2-br100",
    star: 5,
  },
  {
    id: 2,
    name: "Harsh Preetam panday",
    designation: "Student @InnovateInstitute",
    content:
      "I am grateful for the incredible  and grow in web and mobile app development. The supportive and collaborative team environment has enhanced my skills and fostered a deeper understanding of the technologies. ",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjWlbcTYgyHBZBsh0NlJpoSyxWlekNVbWtHgCA0ypPfa-uVpfvYv=w83-h83-p-rp-mo-br100",
    star: 5,
  },
  {
    id: 3,
    name: "Ravi Verma",
    designation: "Student @NextGenTech",
    content:
      "An incredible workspace with a dynamic environment, offering top-notch web and app development services. Dedication to excellence, innovation, and seamless execution fosters learning, growth, and outstanding solutions.",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjWHqn9OZtbWThISRuxveIXnY5kvWP-bkbMgFhE0H2MoJxDaY-Mn=w83-h83-p-rp-mo-br100",
    star: 5,
  },
  {
    id: 4,
    name: "Agni Patel",
    designation: "Student @DigitalAcademy",
    content:
      " A fantastic opportunity to learn and excel in web and mobile app development, supported by a highly collaborative, innovative, and encouraging team.",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKFuSUqzGYzM7k_uxc_RVGUJV7_x10-Mk8P0M_Oz1mBnPuJZg=w83-h83-p-rp-mo-br100",
    star: 5,
  },
  {
    id: 5,
    name: "Keke Yadav",
    designation: "Student @SmartCode Institute",
    content:
      "Difmo Technologies fosters an unparalleled creative environment and collaborative spirit. The team's dedication to crafting user-centric designs is truly inspiring.",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocIw0cgjpDBsFci7G64xeuJr0BEA5wYhvcIxJW_16j2Yv1NffQ=w83-h83-p-rp-mo-br100",
    star: 5,
  },
  {
    id: 6,
    name: "Satya Kumar",
    designation: "Student @TechBliss Academy",
    content:
      " A fantastic opportunity to gain hands-on experience and enhance coding skills. Real-world projects and a supportive team provided valuable industry insights. ",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjUWinmB_CrkpTD9H5BOdPnTMmqHDx8H8DJeit3i7fwGSfomDR8=w83-h83-p-rp-mo-br100",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Our Student Reviews"
          // paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        <div className="overflow-x-auto py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonialData.map((testimonial) => (
              <SingleTestimonial
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-5 z-[-1]">
        <svg
          width="238"
          height="531"
          viewBox="0 0 238 531"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="422.819"
            y="-70.8145"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 422.819 -70.8145)"
            fill="url(#paint0_linear_83:2)"
          />
          <rect
            opacity="0.3"
            x="426.568"
            y="144.886"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 426.568 144.886)"
            fill="url(#paint1_linear_83:2)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_83:2"
              x1="517.152"
              y1="-251.373"
              x2="517.152"
              y2="459.865"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4F43" />
              <stop offset="1" stopColor="#FF4F43" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_83:2"
              x1="455.327"
              y1="-35.673"
              x2="455.327"
              y2="675.565"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4F43" />
              <stop offset="1" stopColor="#FF4F43" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-5 left-0 z-[-1]">
        <svg
          width="279"
          height="106"
          viewBox="0 0 279 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373"
              stroke="url(#paint0_linear_72:302)"
            />
            <path
              d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"
              stroke="url(#paint1_linear_72:302)"
            />
            <path
              d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.7589 88.2373 90.3692C109.97 82.3821 116.861 71.9642 156.615 74.7423C178.778 76.291 195.31 80.2985 205.911 73.3533C216.513 66.408 224.994 58.7682 243.016 60.1572C255.835 61.1453 265.278 61.8936 278 56.3373"
              stroke="url(#paint2_linear_72:302)"
            />
            <path
              d="M-57 35L50.0728 97.8548C55.5501 102.022 70.8513 108.759 88.2373 102.369C109.97 94.3821 116.861 83.9642 156.615 86.7423C178.778 88.291 195.31 92.2985 205.911 85.3533C216.513 78.408 224.994 70.7682 243.016 72.1572C255.835 73.1453 265.278 73.8936 278 68.3373"
              stroke="url(#paint3_linear_72:302)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_72:302"
              x1="256.267"
              y1="53.6717"
              x2="-40.8688"
              y2="8.15715"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4F43" stopOpacity="0" />
              <stop offset="1" stopColor="#FF4F43" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_72:302"
              x1="256.267"
              y1="42.6717"
              x2="-40.8688"
              y2="-2.84285"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4F43" stopOpacity="0" />
              <stop offset="1" stopColor="#FF4F43" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_72:302"
              x1="256.267"
              y1="64.6717"
              x2="-40.8688"
              y2="19.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4F43" stopOpacity="0" />
              <stop offset="1" stopColor="#FF4F43" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_72:302"
              x1="256.267"
              y1="76.6717"
              x2="-40.8688"
              y2="31.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4F43" stopOpacity="0" />
              <stop offset="1" stopColor="#FF4F43" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Testimonials;
