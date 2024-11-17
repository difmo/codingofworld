import React from "react";

const EventModel = ({ onClick }) => {
  return (
    <div className="fixed w-full ">
<div className="w-full px-4 py-4 overflow-hidden md:px-6 lg:px-8">
  <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0 animate">
    <div className="text-lg text-center text-black sm:text-xl whitespace-wrap sm:text-left">
      Join our Demo Class, Nov 20–22, 2024, for a hands-on session with expert trainers.
    </div>
    <span
      className="p-2 text-center text-white border rounded-full cursor-pointer bg-primary"
      onClick={onClick}
    >
      Register now
    </span>
  </div>
</div>



      <style jsx>{`
        /* Defining the scrolling animation */
        @keyframes marquee {
          0% {
            transform: translateX(100%); /* Start from the right */
          }
          100% {
            transform: translateX(-100%); /* End at the left */
          }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 50s linear infinite; /* Adjust the speed here (60s) */
        }

        /* Ensure the parent container has overflow hidden */
        .overflow-hidden {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EventModel;
