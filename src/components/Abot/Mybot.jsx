import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { FaRobot } from "react-icons/fa";
import logo from '../../assets/images/logo.svg';

const MyBot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false); // State to manage loading status
    const [defaultQuestions, setDefaultQuestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // To track whether the chatbot is open or minimized
    const chatContainerRef = useRef(null); // To control scrolling

    // Fetch predefined questions from the server on component mount
    useEffect(() => {
        const fetchDefaultQuestions = async () => {
            try {
                const response = await axios.get('https://chatbot-1-91y1.onrender.com/get_default_questions');
                setDefaultQuestions(response.data.questions); // Assuming the response is in the format { questions: [...] }
            } catch (error) {
                console.error("Error fetching default questions:", error);
            }
        };
        fetchDefaultQuestions();
    }, []);

    // Scroll to the bottom whenever the chat history updates
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();  // Prevent the default form submit behavior

        if (userInput.trim()) {
            setChatHistory([...chatHistory, { sender: 'User', message: userInput }]);
            setLoading(true); // Set loading to true while waiting for bot response

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

            setLoading(false); // Set loading to false after bot responds
        }
        setUserInput('');
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);  // Toggle chat window open/close
    };

    return (
        <div>
            {/* Minimized floating button on small devices */}
            
                <div
                    className="fixed z-20 flex items-center justify-center w-16 h-16 bg-red-500 rounded-full shadow-xl cursor-pointer md:hidden bottom-5 right-5 sm:w-16 md:w-20"
                    onClick={toggleChat}  // Open chat when clicked
                >
                    <FaRobot className="text-3xl text-white" />
                </div>
           

            {/* Chatbot Container (Only visible when the chatbot is open) */}
        
                <div className={`fixed z-10 ${!isOpen ? "block":"hidden"} md:flex-row    w-full bg-white shadow-2xl bottom-5 right-5 sm:w-80 md:w-96 chatbot-container rounded-xl`}>
                    {/* Chatbot Header */}
                    <div className="flex items-center justify-between p-3 text-white bg-red-500 rounded-t-xl">
                        <div className="flex items-center space-x-3">
                            <FaRobot className="text-2xl animate-pulse" />
                            <h1 className="text-sm font-bold sm:text-lg">Difmo Bot</h1>
                        </div>
                        <button
                            className="text-xl text-white"
                            onClick={toggleChat}  // Close chat when clicked
                        >
                            X
                        </button>
                    </div>

                    {/* Conditional Rendering of Chat History or Company Logo */}
                    {chatHistory.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 p-10 space-y-4 bg-gray-100">
                            {/* Company Logo and Name */}
                            <img src={logo} alt="Company Logo" className="object-contain w-16 h-16" />
                            <h2 className="text-lg font-bold">Difmo</h2>
                            <p className="text-sm text-gray-600">Chat with Difmo Bot for assistance!</p>
                        </div>
                    ) : (
                        <div
                            ref={chatContainerRef}
                            className="h-64 p-3 space-y-2 overflow-y-auto bg-gray-100 sm:h-72 md:h-80 chatbox"
                        >
                            {chatHistory.map((entry, index) => (
                                <div
                                    key={index}
                                    className={`message p-2 rounded-md text-sm ${
                                        entry.sender === 'User'
                                            ? 'bg-blue-100 text-blue-800 self-end'
                                            : 'bg-gray-300 text-gray-800 self-start'
                                    }`}
                                >
                                    <strong className="block">{entry.sender}:</strong>
                                    <span>{entry.message}</span>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start space-x-1">
                                    <div className="w-2.5 h-2.5 bg-gray-600 rounded-full animate-pulse"></div>
                                    <div className="w-2.5 h-2.5 bg-gray-600 rounded-full animate-pulse"></div>
                                    <div className="w-2.5 h-2.5 bg-gray-600 rounded-full animate-pulse"></div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="flex items-center p-3 bg-gray-200 input-form rounded-b-xl">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your question..."
                            className="flex-grow p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-base"
                        />
                        <button
                            type="submit"
                            className="p-2 px-4 ml-2 text-sm text-white transition duration-200 bg-red-500 rounded-full hover:bg-red-300 sm:text-base"
                        >
                            Send
                        </button>
                    </form>
                </div>
     
        </div>
    );
};

export default MyBot;
