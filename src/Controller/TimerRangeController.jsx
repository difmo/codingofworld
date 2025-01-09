import { useState, useEffect } from "react";

const TimerRangeController = () => {

    const startTime = new Date('Thu Jan 09 2025 14:46:05 GMT+0530 (India Standard Time)');
    const endTime = new Date('Thu Jan 09 2025 16:24:05 GMT+0530 (India Standard Time)');

    // Function to calculate time left
    const calculateTimeLeft = () => {
        const now = new Date();

        // Check if the timer has not started yet
        if (now < startTime) {
            return 'notStarted';
        }

        const difference = endTime - now;

        // Check if the timer has ended
        if (difference <= 0) {
            return 'ended';
        }

        return 'running';
    };

    const [status, setStatus] = useState(calculateTimeLeft());
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const currentStatus = calculateTimeLeft();
            setStatus(currentStatus);

            // Set button active only when timer is running
            if (currentStatus === 'running') {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(timer);
    }, []);

    return { status, isActive };
};

export default TimerRangeController;
