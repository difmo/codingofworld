import React from 'react';

const EventModel = ({onClick}) => {
  return (
    <div className="fixed w-full ">
      <div className="w-full overflow-hidden">
        <div className="flex animate-marquee">
          <div className="text-xl text-black whitespace-nowrap">
        Don't miss out on the chance to register for our exclusive Demo Class, happening on 20th November 2024 To 22th November 2024.   <span className='p-1 text-white border rounded-full cursor-pointer bg-primary' onClick={onClick}>Register now</span> This is your opportunity to get a hands-on introduction to our expert-led training sessions. <span className='p-1 text-white border rounded-full cursor-pointer bg-primary' onClick={onClick}>Register now</span>
          </div>
        
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
