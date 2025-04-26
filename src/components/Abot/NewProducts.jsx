import React, { useState } from "react";
import { FaRobot } from "react-icons/fa"; // Replace FaPlus with another icon, like FaRobot
import { useNavigate } from "react-router-dom";

const NewProducts = () => {
const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/cow-notes");
  };
  return (
    <div>
      {/* Floating button visible only on small screens */}
        <div
          className="fixed z-20 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-xl cursor-pointer bottom-24 right-5 hover:scale-110 transform transition duration-300 ease-in-out"
          onClick={handleNavigate}
        >
          {/* Icon for the button */}
          <FaRobot className="text-white text-3xl animate-bounce" />

          {/* Tooltip Message - always visible after click */}
            <div className="absolute bottom-10 w-44 right-16 bg-primary text-white p-2 rounded-md text-sm shadow-lg opacity-100 transition-opacity duration-300">
              Public Notes Check Now!
            </div>

          {/* Embedded CSS */}
          <style>{`
            .new-product-btn {
              position: fixed;
              bottom: 2.5rem;
              right: 1.25rem;
              z-index: 20;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 4rem;
              height: 4rem;
              background: linear-gradient(45deg, #f06, #4a90e2);
              border-radius: 9999px;
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
              cursor: pointer;
              transition: all 0.3s ease-in-out;
            }

            .new-product-btn:hover {
              box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
              transform: scale(1.1) rotate(15deg);
            }

            .icon-bounce {
              animation: bounce 1.5s infinite;
            }

            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-8px);
              }
            }

            .tooltip-message {
              visibility: hidden;
              opacity: 0;
              position: absolute;
              bottom: 20px;
              right: 50px;
              background-color: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 8px 12px;
              border-radius: 4px;
              font-size: 0.875rem;
              z-index: 30;
            }
          `}</style>
        </div>
    </div>
  );
};

export default NewProducts;
