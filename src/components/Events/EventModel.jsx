import React from 'react';

const EventModel = ({onClick}) => {
  return (
    <div className="fixed w-full bg-red-500">
      <div className="w-full overflow-hidden">
        <div className="flex animate-marquee">
          <div className="text-xl text-white whitespace-nowrap">
          <span className='p-1 bg-red-700 border rounded-full cursor-pointer' onClick={onClick}>Register now</span> Don't miss out on the chance to register for our exclusive Demo Class, happening on 20th November 2024 To 22th November 2024.   <span className='p-1 bg-red-700 border rounded-full cursor-pointer' onClick={onClick}>Register now</span> This is your opportunity to get a hands-on introduction to our expert-led training sessions. Register now to secure your spot for the Demo Class scheduled on 20/11/2024, and take the first step towards mastering the skills that will propel your career. Don't wait—sign up today for the upcoming Demo Class on 20/11/2024 and start your journey towards success!<span className='p-1 bg-red-700 border rounded-full cursor-pointer' onClick={onClick}>Register now</span>
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
          animation: marquee 60s linear infinite; /* Adjust the speed here (60s) */
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
