import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const faqs = [
  {
    question: "What is your refund policy?",
    answer: "We offer a full refund within 30 days of purchase if you are not satisfied with our product."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our customer support via email at support@example.com or call us at (123) 456-7890."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers."
  },
  {
    question: "Can I change my subscription plan?",
    answer: "Yes, you can upgrade or downgrade your subscription plan at any time in your account settings."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for new users."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={ref} className="max-w-8xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-4 container">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div 
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && (
              <div className="p-4 text-gray-700">
                {faq.answer}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
