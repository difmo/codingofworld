import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const TimerButton = () => {
    const navigate = useNavigate();
    const [isUserLogin, setIsUserLogin] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.emailVerified) {
                    setIsUserLogin(user);
                } else {
                    console.log("Email is not verified yet");
                    setIsUserLogin(false);
                }
            } else {
                setIsUserLogin(false);
                console.log("User is not logged in yet");
            }
        });

        // Cleanup on component unmount
        return () => unsubscribe();
    }, []); // Empty dependency array so it runs only once on mount

    const startTime = new Date('Thu Jan 11 2025 10:30:00 GMT+0530 (India Standard Time)');
    const endTime = new Date('Thu Jan 11 2025 16:00:00 GMT+0530 (India Standard Time)');

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
    }, []); // Empty dependency array so it runs only once

    const handleOnClickGiveTest = () => {
        if (isUserLogin) {
            navigate("/students-test");
        } else {
            alert("Login to give the test!");
        }
    };

    return (
        <div className="flex justify-center items-center w-full">
            {time.status === 'notStarted' ? (
                <button className="bg-gray-500 mb-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    Test time  10:30 AM(11) - 7:00 PM(11)
                </button>
            ) : time.status === 'running' ? (
                <button 
                    onClick={handleOnClickGiveTest} 
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-2 flex justify-between items-center"
                >
                    <p className="text-left">Give Test</p>
                    <h1 className="text-xl text-right">
                        {`${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}
                    </h1>
                </button>
            ) : (
                <button
                    className="bg-red-500 mb-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    onClick={() => alert('Test Ended')}
                >
                    Wait for next test
                </button>
    )}
        </div>
    );
};

export default TimerButton;
