import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBlog,
  FaCertificate,
  FaDiscourse,
  FaFilePdf,
  FaPersonBooth,
} from "react-icons/fa";
import { useAuth } from "../../context/Providers/AuthContext"; // Import Auth context
import { useProfile } from "../../context/Providers/ProfileContext"; // Import Profile context
import CertificatesGeneratorComponent from "../../components/CertificatesGen/CertificatesGenerator";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const { isAdmin, blogPermission, bloggerName, studentData, error, loading } =
    useProfile(); //

  const [isCertificateVisible, setIsCertificateVisible] = useState(false);
  const navigate = useNavigate();

  const toggleCertificateVisibility = () => {
    setIsCertificateVisible(!isCertificateVisible);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/auth/signin";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full bg-gray-50 p-6">
      <div className="w-full h-full mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Student Profile</h1>
          <p className="mt-2 text-lg text-gray-600">
            View and manage your personal details and certificates
          </p>
        </div>

        {user && (
          <div className="text-right mt-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
              Logout
            </button>

            {isAdmin && (
              <div
                onClick={() => navigate("/admin")}
                className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600 mt-4"
              >
                <FaPersonBooth className="mr-3" />
                <span>Admin Dashboard</span>
              </div>
            )}

            {!blogPermission ? (
              <div
                onClick={() => navigate("/create-blog")}
                className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600 mt-4"
              >
                <FaBlog className="mr-3" />
                <span>Create Blog</span>
              </div>
            ) : (
              <div className="mt-4">
                <div
                  onClick={() => navigate("/create-blogs/all-blogs")}
                  className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600"
                >
                  <FaBlog className="mr-3" />
                  <span>Your Blogs</span>
                </div>
                <div
                  onClick={() => navigate("/create-courses")}
                  className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600 mt-4"
                >
                  <FaDiscourse className="mr-3" />
                  <span>Create Course</span>
                </div>
              </div>
            )}
          </div>
        )}

        {studentData && (
          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Personal Information
              </h2>
              <div className="mt-4">
                <p className="text-lg text-gray-600">
                  <strong>Name:</strong> {studentData.name}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Email:</strong> {studentData.email}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Contact:</strong> {studentData.mobnum}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Address:</strong> {studentData.address}
                </p>
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
            {isCertificateVisible && (
              <CertificatesGeneratorComponent name={studentData.name} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
