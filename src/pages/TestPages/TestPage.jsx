
import { useNavigate } from 'react-router-dom';
import img from '../../assets/images/logo.svg';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { auth } from '../../firebase';

const TestPage = () => {
    const [isUserLogin, setIsUserLogin] = useState(null);
    const [userUid, setUserUid] = useState(null);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        mobnum: '',
        stream: 'btech',
        answers: [],
    });
    const [isFormComplete, setIsFormComplete] = useState(false); // New state for form completion
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const { isActive, status } = TimerRangeController();

    // Check if all fields are filled
    useEffect(() => {
        const { name, email, mobnum, stream } = userData;
        setIsFormComplete(name && email && mobnum && stream);  // Ensure all fields are filled
    }, [userData]); // Re-run when userData changes

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.emailVerified) {
                    setIsUserLogin(user);
                    setUserUid(user.uid);
                } else {
                    console.log("Email is not verified yet");
                }
            } else {
                setIsUserLogin(false);
                console.log("User is not logged in yet");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleAnswerChange = (e) => {
        const { value } = e.target;
        const updatedAnswers = [...userData.answers];
        updatedAnswers[currentQuestion] = value;
        setUserData({ ...userData, answers: updatedAnswers });
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        if (!isUserLogin) {
            alert("Please login to submit the test.");
            return;
        }

        const studentRef = doc(db, "students", userUid);
        const studentDoc = await getDoc(studentRef);

        if (studentDoc.exists()) {
            const studentData = studentDoc.data();

            if (studentData.completed) {
                alert("You have already submitted the test.");
                return;
            }
        }

        const { name, email, mobnum, stream, answers } = userData;

        const marks = answers.reduce((total, answer, index) => {
            if (answer === questions[index].answer) {
                return total + 1;
            }
            return total;
        }, 0);

        try {
            await setDoc(studentRef, {
                name,
                email,
                mobnum,
                stream,
                answers,
                marks,
                timestamp: new Date(),
                completed: true,
                questions: questions,
            });

            setCompleted(true);
        } catch (error) {
            console.error("Error submitting test:", error);
        }
    };

    if (status !== 'running') {
        return <div>Wait for Test Starting</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100" style={{ backgroundImage: 'url(public/153349.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="w-full mx-4 max-w-xl bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                {!completed ? (
                    <>
                        <div className="flex flex-col items-center justify-center mb-8">
                            <div className='flex flex-row items-center'>
                                <img src={img} alt="Logo" className="h-12 w-12 mr-4" />
                                <h1 className="text-xl text-center font-bold text-secondaryblue">Welcome to the Test Page</h1>
                            </div>
                            <p className='text-center'>Get Your Certificate</p>
                        </div>

                        <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                className="mt-1 p-2 border border-primary rounded-md w-full"
                                placeholder="Your name"
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                className="mt-1 p-2 border border-primary rounded-md w-full"
                                placeholder="Your email"
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                            <input
                                type="number"
                                value={userData.mobnum}
                                onChange={(e) => setUserData({ ...userData, mobnum: e.target.value })}
                                className="mt-1 p-2 border border-primary rounded-md w-full"
                                placeholder="Your number"
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-gray-700">Stream</label>
                            <select
                                value={userData.stream}
                                onChange={(e) => setUserData({ ...userData, stream: e.target.value })}
                                className="mt-1 p-2 border border-primary rounded-md w-full"
                            >
                                <option value="btech">BTech</option>
                                <option value="polytechnic">Polytechnic</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Disable the next button if the form is not complete */}
                        {isFormComplete && (
                            <div className="mb-4 w-full">
                                <h3 className="font-medium text-primary text-lg">Question {currentQuestion + 1}</h3>
                                <p className="mb-2 text-secondaryblue">{questions[currentQuestion].question}</p>
                                <div>
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <label key={index} className="block">
                                            <input
                                                type="radio"
                                                value={option}
                                                checked={userData.answers[currentQuestion] === option}
                                                onChange={handleAnswerChange}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center w-full">
                            <button
                                onClick={handlePrevQuestion}
                                disabled={currentQuestion === 0}
                                className="px-4 py-2 bg-primary text-white rounded-md"
                            >
                                Prev Question
                            </button>
                            {currentQuestion < questions.length - 1 && (
                                <button
                                    onClick={handleNextQuestion}
                                    className="px-4 py-2 bg-secondaryblue text-white rounded-md"
                                >
                                    Next Question
                                </button>
                            )}
                            {currentQuestion === questions.length - 1 && (
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <h3 className="font-medium text-lg text-green-500">Test Submitted Successfully!</h3>
                        <p className="mt-2 text-sm">Thank you for submitting your test. We will review it soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestPage;


const questions = [
    {
        id: 1,
        question: "What is the time complexity of binary search?",
        options: ["O(log n)", "O(n)", "O(n^2)", "O(log n^2)"],
        answer: "O(log n)",
    },
    {
        id: 2,
        question: "Which data structure is used in depth-first search?",
        options: ["Queue", "Stack", "Linked List", "Array"],
        answer: "Stack",
    },
    {
        id: 3,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
    },
    {
        id: 4,
        question: "Which data structure follows FIFO (First In First Out) principle?",
        options: ["Stack", "Queue", "Array", "Linked List"],
        answer: "Queue",
    },
    {
        id: 5,
        question: "Which data structure follows LIFO (Last In First Out) principle?",
        options: ["Stack", "Queue", "Array", "Linked List"],
        answer: "Stack",
    },
    {
        id: 6,
        question: "Which data structure is used for implementing recursion?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        answer: "Stack",
    },
    {
        id: 7,
        question: "Which data structure is used for implementing BFS (Breadth-First Search)?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        answer: "Queue",
    },
    {
        id: 8,
        question: "What is the output of the following code: console.log(typeof null)?",
        options: ["object", "null", "undefined", "string"],
        answer: "object",
    },
    {
        id: 9,
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        options: ["push", "pop", "shift", "unshift"],
        answer: "push",
    },
    {
        id: 10,
        question: "What is the correct syntax to create a function in JavaScript?",
        options: ["function myFunction()", "def myFunction()", "create myFunction()", "function:myFunction()"],
        answer: "function myFunction()",
    },
];

const TimerRangeController = () => {

    const startTime = new Date('Thu Jan 09 2025 14:46:05 GMT+0530 (India Standard Time)');
    const endTime = new Date('Thu Jan 09 2025 17:50:05 GMT+0530 (India Standard Time)');

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

