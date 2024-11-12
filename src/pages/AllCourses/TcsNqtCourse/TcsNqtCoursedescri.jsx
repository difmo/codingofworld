import React from "react";
import img from "../../../assets/bg/fact_bg.jpg";
import { useNavigate } from "react-router-dom";

const TcsNqtCourse = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg py-36">
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUk85S-6mDR6PnaKjeh_SrU57K3KecqzRznw&s"// Replace with your image URL
                alt="TCS NQT Course"
                className="object-cover w-full mb-4 rounded-lg"
            />
            <h1 className="mb-4 text-4xl font-bold text-center text-primary">Welcome to TCS NQT Course</h1>
            <p className="mb-6 text-lg text-gray-700">
                Unlock your potential with our TCS NQT course! This course offers a comprehensive introduction to the topics needed to excel in TCS National Qualifier Test.
            </p>
            <h2 className="mb-2 text-2xl font-semibold">What You Will Learn</h2>
            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Understanding the TCS NQT format and requirements</li>
                <li>Key topics in programming and aptitude</li>
                <li>Mock tests and practice questions</li>
                <li>Strategies for effective time management during tests</li>
            </ul>
            <h2 className="mb-2 text-2xl font-semibold">Key Features</h2>
            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Duration: Self-paced</li>
                <li>Format: Online</li>
                <li>Materials: Video lectures, quizzes, and resources</li>
                <li>Certification upon completion</li>
            </ul>
            <h2 className="mb-2 text-2xl font-semibold">Who This Course Is For</h2>
            <p className="mb-4 text-gray-700">
                This course is ideal for students and professionals preparing for the TCS National Qualifier Test and anyone interested in improving their skills in programming and aptitude.
            </p>
            <h2 className="mb-2 text-2xl font-semibold">Enroll Now - It's Free!</h2>
            <button onClick={()=>navigate("/home1")} className="px-6 py-2 mt-4 text-white transition duration-200 rounded-lg bg-primary hover:bg-primary/60">
                Enroll Now
            </button>
            <h2 className="mt-6 mb-2 text-2xl font-semibold">Frequently Asked Questions</h2>
            <p className="mb-2 text-gray-700">
                Is this course really free? <br />
                Yes! We believe in making education accessible to everyone.
            </p>
            <p className="mb-2 text-gray-700">
                How long do I have access to the course? <br />
                You will have lifetime access to all course materials.
            </p>
            <p className="text-gray-700">
                What if I have questions during the course? <br />
                You can reach out to our instructor through the course platform.
            </p>
        </div>
    );
}

export default TcsNqtCourse;
