import React, { useState, useEffect } from 'react';

const TimerButton = () => {
    const startTime = new Date();   
    const end_time = new Date(startTime.getTime() + 1 * 60 * 60 * 1000); // 1 hour from now

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = end_time - now;
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return { hours, minutes, seconds };
    };

    const [time, setTime] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex justify-center items-center">
            {time.hours > 0 || time.minutes > 0 || time.seconds > 0 ? (
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Give Test 
                    <h1 className="text-xl">{`${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</h1>
                </button>
            ) : (
                <button 
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    onClick={() => alert('Call for test')}
                >
                    End
                </button>
            )}
        </div>
    );
}

export default TimerButton;
