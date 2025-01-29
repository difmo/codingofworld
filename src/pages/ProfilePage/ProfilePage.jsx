import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaBlog, FaCertificate, FaFilePdf, FaPersonBooth } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CertificatesGeneratorComponent from '../../components/CertificatesGen/CertificatesGenerator';


const ProfilePage = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserLogin, setIsUserLogin] = useState(null);
    const [blogPermission, setBlogPermission] = useState(false);

    const [bloggerName, setbloggerName] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.emailVerified) {
                    setIsUserLogin(user);
                    fetchUserRole(user.uid);
                    // setUserUid(user.uid);
                } else {
                    console.log("Email is not verified yet");
                }
            } else {
                setIsAdmin(false);
                setIsUserLogin(false);
                console.log("user is not login yet");
            }
        });
        return () => unsubscribe();
    });

    const fetchUserRole = async (uid) => {
        try {
            const userQuery = query(collection(db, "users"), where("uid", "==", uid));
            const querySnapshot = await getDocs(userQuery);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.isCreatePermission == true) {
                        setBlogPermission(true);
                    }
                    if (userData.name) {
                        setbloggerName(userData.name);
                        console.log(userData.name);
                    }
                    // sdfdsf
                    if (userData.whoIs == "isAdmin") {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                });
            } else {
                console.log("No user found with uid");
            }
        } catch (e) {
            console.log(e);
        }
    };


    const navigate = useNavigate();
    // State to store the student's data
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCertificateVisible, setIsCertificateVisible] = useState(false);
    const [name, setName] = useState('John Doe');
    const userUid = auth.currentUser ? auth.currentUser.uid : null;

    useEffect(() => {
        const fetchStudentData = async () => {
            if (userUid) {
                try {
                    const studentRef = doc(db, 'students', userUid);
                    const studentDoc = await getDoc(studentRef);

                    if (studentDoc.exists()) {
                        setStudentData(studentDoc.data());
                        console.log('Student data:', studentDoc.data().name);
                        setName(studentDoc.data().name);
                    } else {
                        setError('Student data not found.');
                    }
                } catch (err) {
                    console.error('Error fetching student data:', err);
                    setError('An error occurred while fetching your data.');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('User not logged in.');
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [userUid]);

    const handleLogout = async () => {
        try {
            await auth.signOut(); // Assuming you have an auth module to handle sign-out
            console.log('User has logged out');
            window.location.href = '/loginloginscreen'; // Redirect to login page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Show loading state while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error state if there is any

    const toggleCertificateVisibility = () => {
        setIsCertificateVisible(!isCertificateVisible);
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Student Profile</h1>
                    <p className="mt-2 text-lg text-gray-600">View and manage your personal details and certificates</p>
                </div>

                {/* Conditionally render logout button based on user login */}
                {isUserLogin && (
                    <div className="text-right mt-4">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>

                        {/* Admin-related links */}
                        {isAdmin && (
                            <li>
                                <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600">
                                    <FaPersonBooth className="mr-3" />
                                    <span onClick={() => navigate('/admin-dashboard')}>Admin</span>
                                </div>
                            </li>
                        )}

                        {/* Conditional Blog-related links */}
                        {!blogPermission ? (

                            <div className="flex items-center text-gray-700 cursor-pointer font-play hover:text-blue-600">
                                <FaBlog className="mr-3" />
                                <span>Create Blogs</span>
                            </div>

                        ) : (

                            <div className="flex items-center text-gray-700 cursor-pointer font-play hover:text-blue-600">
                                <FaBlog className="mr-3" />
                                <div><span onClick={() => navigate('/all-blogs')}>Your Blogs</span></div>
                                <FaBlog className="mr-3" />

                                <div className='p-4'>
                                    <span onClick={() => navigate('/all-course')}>Create Courses</span>
                                </div>
                            </div>

                        )}
                    </div>
                )}

                {!error ? <></> :
                    <div className="text-center text-red-500">{error}</div>}


                {studentData && (
                    <div className="mt-8 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
                            <div className="mt-4">
                                <p className="text-lg text-gray-600"><strong>Name:</strong> {studentData.name}</p>
                                <p className="text-lg text-gray-600"><strong>Email:</strong> {studentData.email}</p>
                                <p className="text-lg text-gray-600"><strong>Contact:</strong> {studentData.mobnum}</p>
                                <p className="text-lg text-gray-600"><strong>Address:</strong> {studentData.address}</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleCertificateVisibility}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
                        >
                            <FaCertificate /> <span>Show Certificate</span>
                        </button>
                        {isCertificateVisible && (
                            <button
                                onClick={() => setIsCertificateVisible(false)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center space-x-2"
                            >
                                <FaFilePdf /> <span>Hide Certificate</span>
                            </button>

                        )}
                        {/* Display Certificate if Visible */}
                        {isCertificateVisible && <CertificatesGeneratorComponent name={name} />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
