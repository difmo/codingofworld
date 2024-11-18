import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const EventModel = ({ onClick }) => {
  return (
      <div className="w-full ">
        <div className="flex flex-col items-center justify-between space-y-4 sm:space-y-0 animate">
          <div className="text-4xl text-center text-primary sm:text-xl whitespace-wrap sm:text-left">
            Join our Demo Class, Nov 20–22, 2024, for a hands-on session with expert trainers.
          </div>
          <button
            onClick={onClick}
            className="flex items-center gap-2 primary-btn group blinking-btn"
          >
            Join now
            <IoIosArrowRoundForward className="text-sm duration-300 group-hover:translate-x-2 group-hover:-rotate-45" />
          </button>
        </div>

      {/* Inline CSS */}
      <style jsx>{`
        /* Keyframe animation for blinking effect */
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        /* Button styles */
        .blinking-btn {
          animation: blink 1s infinite;
        }

        .primary-btn {
          background-color: #ff6b6b; /* Example primary button color */
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          font-weight: bold;
          text-transform: uppercase;
          transition: transform 0.3s ease;
        }

        .primary-btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default EventModel;
