import React from "react";
import img from "../../../assets/bg/fact_bg.jpg";
import { useNavigate } from "react-router-dom";

const TcsNqtCourse = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg py-36">
            {/* Header Image */}
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUk85S-6mDR6PnaKjeh_SrU57K3KecqzRznw&s"// Replace with your image URL
                alt="TCS NQT Course"
                className="w-full  object-cover rounded-lg mb-4"
            />
            <h1 className="text-4xl font-bold text-center mb-4 text-primary">Welcome to TCS NQT Course</h1>
            <p className="text-lg text-gray-700 mb-6">
                Unlock your potential with our TCS NQT course! This course offers a comprehensive introduction to the topics needed to excel in TCS National Qualifier Test.
            </p>
            <h2 className="text-2xl font-semibold mb-2">What You Will Learn</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Understanding the TCS NQT format and requirements</li>
                <li>Key topics in programming and aptitude</li>
                <li>Mock tests and practice questions</li>
                <li>Strategies for effective time management during tests</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Duration: Self-paced</li>
                <li>Format: Online</li>
                <li>Materials: Video lectures, quizzes, and resources</li>
                <li>Certification upon completion</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2">Who This Course Is For</h2>
            <p className="text-gray-700 mb-4">
                This course is ideal for students and professionals preparing for the TCS National Qualifier Test and anyone interested in improving their skills in programming and aptitude.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Enroll Now - It's Free!</h2>
            <button onClick={()=>navigate("/starttcsnqt")} className="mt-4 bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/60 transition duration-200">
                Enroll Now
            </button>
            <h2 className="text-2xl font-semibold mb-2 mt-6">Frequently Asked Questions</h2>
            <p className="text-gray-700 mb-2">
                Is this course really free? <br />
                Yes! We believe in making education accessible to everyone.
            </p>
            <p className="text-gray-700 mb-2">
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
