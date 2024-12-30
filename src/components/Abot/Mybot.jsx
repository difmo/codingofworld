import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";
import logo from "../../assets/images/chatboat.png";

const MyBot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [defaultQuestions, setDefaultQuestions] = useState([]);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // Open by default on desktop
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchDefaultQuestions = async () => {
      try {
        const response = await axios.get(
          "https://chatbot-1-91y1.onrender.com/get_default_questions"
        );
        setDefaultQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching default questions:", error);
      }
    };
    fetchDefaultQuestions();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (userInput.trim()) {
      setChatHistory([...chatHistory, { sender: "You", message: userInput }]);
      setLoading(true);

      try {
        const response = await axios.post(
          "https://chatbot-1-91y1.onrender.com/get_response",
          {
            query: userInput,
          }
        );
        setChatHistory([
          ...chatHistory,
          { sender: "You", message: userInput },
          { sender: "Alice", message: response.data.response },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setChatHistory([
          ...chatHistory,
          { sender: "You", message: userInput },
          { sender: "Alice", message: "Sorry, there was an error." },
        ]);
      }

      setLoading(false);
    }
    setUserInput("");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Floating button visible only on small screens */}
      {!isOpen && (
        <div
          className="fixed z-20 flex items-center justify-center w-16 h-16 bg-red-500 rounded-full shadow-xl cursor-pointer bottom-5 right-5 "
          onClick={toggleChat}
        >
          <img
            src={logo}
            alt="Company Logo"
            className="object-contain w-12 h-12"
          />
        </div>
      )}

      {/* Chatbot container */}
      {isOpen && (
        <div
          className={`fixed z-10 w-full bg-white shadow-2xl bottom-0 right-0 sm:w-80 md:w-96 lg:w-[28rem] chatbot-container rounded-t-xl ${
            window.innerWidth < 768 ? "rounded-t-xl" : "rounded-xl"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-t-xl">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Company Logo"
                className="object-contain w-8 h-8"
              />
              <h1 className="text-sm font-bold sm:text-lg">Alice Assistant</h1>
            </div>
            <button className="text-xl text-white" onClick={toggleChat}>
              ✕
            </button>
          </div>

          {/* Chat History */}
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 p-5 space-y-4 bg-gray-100">
              <img
                src={logo}
                alt="Company Logo"
                className="object-contain w-20 h-20"
              />
              <h2 className="text-lg font-semibold text-gray-700">
                Hi, I am Alice
              </h2>
              <p className="text-sm text-gray-600">
                How can I assist you today?
              </p>
            </div>
          ) : (
            <div
              ref={chatContainerRef}
              className="h-64 p-3 space-y-2 overflow-y-auto bg-gray-100 sm:h-72 md:h-80 lg:h-[25rem] chatbox"
            >
              {chatHistory.map((entry, index) => (
                <div
                  key={index}
                  className={`flex ${
                    entry.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg text-sm max-w-[75%] shadow-md ${
                      entry.sender === "You"
                        ? "bg-gradient-to-r from-red-500 to-red-700 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                    style={{
                      borderTopLeftRadius:
                        entry.sender === "You" ? "20px" : "5px",
                      borderTopRightRadius:
                        entry.sender === "You" ? "5px" : "20px",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <strong className="block mb-1 font-semibold">
                      {entry.sender}
                    </strong>
                    <span>{entry.message}</span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex space-x-1">
                  <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-pulse"></div>
                  <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-pulse"></div>
                  <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center p-3 bg-gray-200 input-form rounded-b-xl"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-grow p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-base"
            />
            <button
              type="submit"
              className="p-2 px-4 ml-2 text-sm text-white transition duration-200 bg-red-500 rounded-full hover:bg-red-600 sm:text-base"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyBot;
