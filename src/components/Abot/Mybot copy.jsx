import React, { useEffect, useState } from "react";


import axios from 'axios';
import { FaRobot } from "react-icons/fa";


const MyBot = () => {


    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [defaultQuestions, setDefaultQuestions] = useState([]);

    // Fetch predefined questions from server on component mount
    useEffect(() => {
        const fetchDefaultQuestions = async () => {
            try {
                const response = await axios.get('https://chatbot-1-91y1.onrender.com/get_default_questions');
                setDefaultQuestions(response.data.questions);  // Assuming the response is in the format { questions: [...] }
            } catch (error) {
                console.error("Error fetching default questions:", error);
            }
        };

        fetchDefaultQuestions();
    }, []);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();  // Prevent the default form submit behavior

        if (userInput.trim()) {
            setChatHistory([...chatHistory, { sender: 'User', message: userInput }]);

            try {
                const response = await axios.post('https://chatbot-1-91y1.onrender.com/get_response', {
                    query: userInput
                });
                setChatHistory([
                    ...chatHistory,
                    { sender: 'User', message: userInput },
                    { sender: 'Chatbot', message: response.data.response }
                ]);
            } catch (error) {
                console.error("Error:", error);
                setChatHistory([
                    ...chatHistory,
                    { sender: 'User', message: userInput },
                    { sender: 'Chatbot', message: "Sorry, there was an error." }
                ]);
            }
        }
        setUserInput('');
    };

    const handlePredefinedQuestion = async (question) => {
        setUserInput(question);
        // await handleSubmit();  // Call handleSubmit to process the predefined question
    };



    const textOptions = [
        "Master the latest technologies with hands-on coding tutorials.",
        "Stay ahead in tech with cutting-edge programming lessons.",
        "Explore AI, web development, and more with Coding of World!",
    ];


    return (
        <div>


            <div className="fixed bottom-0 z-10 bg-white shadow-2xl chatbot-container right-5 rounded-xl w-80 md:w-96">
                {/* Chatbot Header */}
                <div className="flex items-center justify-between p-3 text-white bg-red-500 rounded-t-xl">
                    <div className="flex items-center space-x-3">
                        <FaRobot className="text-2xl animate-pulse" />
                        <h1 className="text-lg font-bold">Chatbot</h1>
                    </div>
                </div>

                {/* Chat History */}
                <div className="h-64 p-3 space-y-2 overflow-y-auto bg-gray-100 chatbox">
                    {chatHistory.map((entry, index) => (
                        <div
                            key={index}
                            className={`message p-2 rounded-md text-sm ${entry.sender === 'User'
                                    ? 'bg-blue-100 text-blue-800 self-end'
                                    : 'bg-gray-300 text-gray-800 self-start'
                                }`}
                        >
                            <strong className="block">{entry.sender}:</strong>
                            <span>{entry.message}</span>
                        </div>
                    ))}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex items-center p-3 bg-gray-200 input-form rounded-b-xl">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="p-2 px-4 ml-2 text-white transition duration-200 bg-red-500 rounded-full hover:bg-red-300"
                    > 
                        Send
                    </button>
                </form>

            </div>
        </div>
    )
}

export default MyBot