import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/images/logo.svg';
import { db } from '../../firebase';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { auth } from '../../firebase';

const TestPage = () => {
    const [isUserLogin, setIsUserLogin] = useState(null);
    const [userUid, setUserUid] = useState(null);
    const [isTestCompleted, setIsTestCompleted] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        mobnum: '',
        stream: 'btech',
        answers: [],
    });
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const { status, isActive } = TimerRangeController();  // Get status and isActive from TimerRangeController

    // Check if all fields are filled
    useEffect(() => {
        const { name, email, mobnum, stream } = userData;
        setIsFormComplete(name && email && mobnum && stream);  // Ensure all fields are filled
    }, [userData]);
    useEffect(() => {
        const IsTestCompleted = async () => {

            const studentRef = doc(db, "studensSecondTest", userUid);
            const studentDoc = await getDoc(studentRef);

            if (studentDoc.exists()) {
                const studentData = studentDoc.data();
                if (studentData.completed) {
                    setIsTestCompleted(true);
                   console.log("isTestCompleted = ", isTestCompleted);
                }
            }
        }
        IsTestCompleted();
    }
);
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.emailVerified) {
                    setIsUserLogin(user);
                    setUserUid(user.uid);
                } else {
                    console.log("Email is not verified yet");
                    setIsUserLogin(false);
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

        const studentRef = doc(db, "studensSecondTest", userUid);
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

    if (status === 'notStarted') {
        return <div className=" text-3xl flex justify-center items-center h-screen">Wait for the test to start...</div>;
    }

    if (status === 'ended') {
        // if (true) {
        return <div className=" text-3xl flex justify-center items-center h-screen">The test has ended. Thank you!</div>;
    }
    if (!isUserLogin) {
        return (
            <div className=" text-3xl flex justify-center items-center h-screen">
                <div >First Login</div>
            </div>
        );
    }


    if (isTestCompleted) {
        return (
            <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h3 className="font-medium text-lg text-green-500">You have Already Submitted the test</h3>
            </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100" style={{ backgroundImage: 'url(src/assets/images/153349.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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

                        {/* Render Questions */}
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
;


const questions = [
    {
        "question": "Which of the following is NOT a property of an ideal hashing function?",
        "options": ["Uniform distribution of keys", "Efficient computation", "Collision occurrence frequently", "Deterministic output"],
        "answer": "Collision occurrence frequently"
    },
    {
        "question": "In computer architecture, the ‘Von Neumann bottleneck’ refers to:",
        "options": ["Limited memory bandwidth", "Slow CPU processing speed", "Lack of parallelism in CPU", "Inefficient instruction execution"],
        "answer": "Limited memory bandwidth"
    },
    {
        "question": "Which of the following scheduling algorithms causes starvation for low-priority processes?",
        "options": ["Round Robin", "First Come First Serve", "Shortest Job Next", "Multilevel Queue Scheduling"],
        "answer": "Shortest Job Next"
    },
    {
        "question": "In networking, which layer of the OSI model is responsible for flow control and error handling?",
        "options": ["Data Link Layer", "Transport Layer", "Network Layer", "Application Layer"],
        "answer": "Transport Layer"
    },
    {
        "question": "Which of the following best describes ‘Pipelining’ in CPU execution?",
        "options": ["Parallel execution of independent instructions", "Execution of a single instruction in multiple steps", "Pre-fetching instructions before execution", "Reducing instruction latency through caching"],
        "answer": "Execution of a single instruction in multiple steps"
    },
    {
        "question": "What is the worst-case time complexity of QuickSort?",
        "options": ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        "answer": "O(n²)"
    },
    {
        "question": "Which of the following data structures can be used to implement Dijkstra’s shortest path algorithm efficiently?",
        "options": ["Stack", "Queue", "Binary Heap", "Hash Table"],
        "answer": "Binary Heap"
    },
    {
        "question": "If a balanced BST has ‘n’ nodes, what is the height of the tree?",
        "options": ["O(n)", "O(n log n)", "O(log n)", "O(√n)"],
        "answer": "O(log n)"
    },
    {
        "question": "Which sorting algorithm is best suited for nearly sorted data?",
        "options": ["Bubble Sort", "Merge Sort", "Insertion Sort", "Heap Sort"],
        "answer": "Insertion Sort"
    },
    {
        "question": "In a max heap, if the root node has index ‘i’, what is the index of its left child?",
        "options": ["2i", "2i + 1", "2i - 1", "i/2"],
        "answer": "2i + 1"
    },
    {
        "question": "The sum of ages of A and B is 50 years. Five years ago, the ratio of their ages was 3:2. What is A’s present age?",
        "options": ["30", "35", "40", "25"],
        "answer": "35"
    },
    {
        "question": "A train 500m long is running at 72 km/h. How long will it take to cross a tunnel 1 km long?",
        "options": ["50 sec", "75 sec", "60 sec", "90 sec"],
        "answer": "75 sec"
    },
    {
        "question": "A can complete a work in 10 days, and B can complete the same work in 15 days. If they work together, how many days will it take to complete the work?",
        "options": ["6 days", "5 days", "4 days", "7 days"],
        "answer": "6 days"
    },
    {
        "question": "The average of 5 consecutive odd numbers is 45. Find the largest number.",
        "options": ["49", "47", "51", "53"],
        "answer": "49"
    },
    {
        "question": "A man invested ₹5000 at 10% per annum compound interest for 2 years. What is the total amount after 2 years?",
        "options": ["₹6000", "₹5500", "₹6050", "₹6050.50"],
        "answer": "₹6050.50"
    },
    {
        "question": "A is twice as fast as B in completing a task. If B takes 18 days to finish the work, how many days will A and B take together?",
        "options": ["12 days", "9 days", "6 days", "10 days"],
        "answer": "9 days"
    },
    {
        "question": "If 2 is coded as 4, 3 is coded as 9, and 4 is coded as 16, then 7 is coded as:",
        "options": ["42", "21", "49", "35"],
        "answer": "49"
    },
    {
        "question": "Find the missing number in the series: 2, 6, 12, 20, __, 42",
        "options": ["30", "28", "32", "36"],
        "answer": "28"
    },
    {
        "question": "In a certain code language, 'MANGO' is written as 'LZMFN.' How is 'APPLE' written in the same code?",
        "options": ["ZOOKD", "ZOOKF", "ZPPKD", "ZOOKE"],
        "answer": "ZOOKE"
    },
    {
        "question": "Pointing to a photograph, a man said, 'I have no brothers or sisters, but that man’s father is my father’s son.' Who is the person in the photograph?",
        "options": ["His uncle", "His son", "His nephew", "Himself"],
        "answer": "His son"
    }
]
const TimerRangeController = () => {

    const startTime = new Date('Thu Jan 19 2025 09:20:00 GMT+0530 (India Standard Time)');
    const endTime = new Date('Thu Jan 19 2025 21:00:00 GMT+0530 (India Standard Time)');

    const calculateTimeLeft = () => {
        const now = new Date();

        if (now < startTime) {
            return 'notStarted';
        }

        const difference = endTime - now;

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

