import React from 'react';
import { motion } from 'framer-motion';
import img from "../assets/images/ourt.svg"

const teamMembers = [
    {
        name: "Alice Johnson",
        role: "Lead Trainer",
        image: "https://via.placeholder.com/150",
        bio: "Alice has over 10 years of experience in mobile app development and is passionate about teaching."
    },
    {
        name: "Bob Smith",
        role: "Web Development Trainer",
        image: "https://via.placeholder.com/150",
        bio: "Bob specializes in full-stack web development and loves sharing his knowledge with students."
    },
    {
        name: "Charlie Brown",
        role: "Data Science Trainer",
        image: "https://via.placeholder.com/150",
        bio: "Charlie is a data scientist with a knack for explaining complex topics in simple terms."
    },
    {
        name: "Diana Prince",
        role: "UI/UX Design Trainer",
        image: "https://via.placeholder.com/150",
        bio: "Diana is an experienced designer who focuses on creating user-friendly interfaces."
    },
    {
        name: "Diana Prince",
        role: "UI/UX Design Trainer",
        image: "https://via.placeholder.com/150",
        bio: "Diana is an experienced designer who focuses on creating user-friendly interfaces."
    },
    {
        name: "Diana Prince",
        role: "UI/UX Design Trainer",
        image: "https://via.placeholder.com/150",
        bio: "Diana is an experienced designer who focuses on creating user-friendly interfaces."
    },
    {
        name: "Diana Prince",
        role: "UI/UX Design Trainer",
        image: "https://via.placeholder.com/150",
        bio: "Diana is an experienced designer who focuses on creating user-friendly interfaces."
    },
    {
        name: "Diana Prince",
        role: "UI/UX Design Trainer",
        image: "https://via.placeholder.com/150",
        bio: "Diana is an experienced designer who focuses on creating user-friendly interfaces."
    },
];

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.2 },
    }),
};

const TrainingTeam = () => {
    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 pt-28 ">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 py-16">
                <div className="flex flex-col">
                    {/* Text Section */}
                    <div className="flex flex-col justify-center">
                        <h6 className="text-center text-4xl text-gray-800 mb-2">OUR INSTRUCTORS</h6>
                        <h1 className="text-center text-3xl font-bold mb-4">
                            Learn from <span className='text-primary'>real-world experts</span> who love to teach
                        </h1>
                        <p className="text-center text-gray-700 text-lg mb-6">
                            Udemy Business instructors bring their experience to the online classroom.
                        </p>    
                        <div className="flex justify-center">
                            <a href="https://business.udemy.com/course-collection/" target="_self" rel="noopener noreferrer">
                                <button className="bg-primary text-white font-semibold py-2 px-4 rounded shadow hover:bg-primary/40 transition duration-300">
                                    View all course topics
                                </button>
                            </a>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center items-center">
                        <img
                            className="max-w-full h-auto"
                            src={img}
                            alt="Instructors"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-10">Meet Our Training Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container py-10">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.name}
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        custom={index}
                        className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                    >
                        <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="font-semibold text-xl">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                            <p className="mt-2 text-gray-700">{member.bio}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TrainingTeam;
