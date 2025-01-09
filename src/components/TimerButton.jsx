import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const TimerButton = () => {
   
    const navigate = useNavigate();


    const startTime = new Date('Thu Jan 09 2025 14:46:05 GMT+0530 (India Standard Time)');
    const endTime = new Date('Thu Jan 09 2025 16:24:05 GMT+0530 (India Standard Time)');
    
    const calculateTimeLeft = () => {
        const now = new Date();
        if (now < startTime) {
            return { status: 'notStarted' };
        }
        const difference = endTime - now;
        if (difference <= 0) {
            return { status: 'ended' };
        }
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return {
            hours,
            minutes,
            seconds,
            status: 'running',
        };
    };

    const [time, setTime] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex justify-center items-center w-full">
            {time.status === 'notStarted' ? (
                <button className="bg-gray-500 mb-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    Timer has not started yet
                </button>
            ) : time.status === 'running' ? (
                <button onClick={()=>navigate("/students-test")} className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-2 flex justify-between items-center">
                    <p className="text-left">Give Test</p>
                    <h1 className="text-xl  text-right">
                        {`${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}
                    </h1>
                </button>
            ) : (
                <button
                    className="bg-red-500 mb-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    onClick={() => alert('Call for test')}
                >
                    Test End
                </button>
            )}
        </div>
    );
};

export default TimerButton;
