import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const faqs = [
  {
    question: "What is Coding of World?",
    answer:
      "Coding of World is an educational platform that provides internships, training, apprenticeships, and career guidance to students. We offer specialized courses in Web Development, Mobile App Development, AI/ML, and Robotics, with 100% placement assistance.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll in any of our courses by visiting our website and selecting the course you wish to pursue. You can then complete the registration process, after which you'll gain access to course materials and resources.",
  },
  {
    question: "What courses are available at Coding of World?",
    answer:
      "We offer training in Web Development, Mobile App Development, AI/ML, and Robotics. These courses are designed to equip students with the skills required for the latest industry trends and demands.",
  },
  {
    question: "Do you provide placement assistance?",
    answer:
      "Yes, Coding of World provides 100% placement assistance. We work with industry partners and offer personalized career guidance to help students secure job opportunities after completing their courses.",
  },
  {
    question: "What is the duration of the courses?",
    answer:
      "The duration of our courses varies. Web Development and Mobile App Development courses typically last 3 to 6 months, while AI/ML and Robotics courses may take 6 to 12 months depending on the program and student progress.",
  },
  {
    question: "Can I get a certificate after completing a course?",
    answer:
      "Yes, Coding of World offers certificates upon successful completion of any course. These certificates are recognized by industry professionals and can be added to your resume or LinkedIn profile.",
  },
  {
    question: "Are there any prerequisites for joining a course?",
    answer:
      "Some courses, like Web Development or Mobile App Development, may require basic knowledge of programming. However, all our courses are designed to accommodate beginners as well as experienced learners. We provide necessary foundational material to help you get started.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support via email at codingofworld@gmail.com or call us at (+91)9455791624, (+91)7800730968. Our team is available to assist you with any inquiries.",
  },
  {
    question: "Is there any financial assistance available?",
    answer:
      "We offer flexible payment plans for our courses. For students who qualify, we also provide discounts and offers on specific courses. Please reach out to our customer support for more details on financial assistance options.",
  },
  {
    question: "Do you offer internships?",
    answer:
      "Yes, Coding of World offers internship opportunities as part of our courses. Our internships allow students to gain hands-on experience and build portfolios to enhance their employability.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={ref} className="px-4 py-16 mx-auto max-w-8xl sm:px-6 bg-gray-50">
      <h2 className="mb-10 text-4xl font-bold text-center text-secondaryblue">
        Frequently <span className="text-primary">Asked Questions</span>  - Coding of World
      </h2>
      <div className="container space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="overflow-hidden bg-white border-2 border-gray-200 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className="flex items-center justify-between p-5 transition duration-300 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              <span className="p-2 text-5xl text-red-500 ">
                {openIndex === index ? "-" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <div className="p-5 text-gray-700 bg-gray-50">
                <p>{faq.answer}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
