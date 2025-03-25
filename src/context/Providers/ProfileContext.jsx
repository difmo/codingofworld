import { createContext, useState, useEffect, useContext } from "react";
import { db, auth } from "../../firebase"; // Import Firebase firestore
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const ProfileContext = createContext();

// Custom hook to access the Profile context
export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogPermission, setBlogPermission] = useState(false);
  const [bloggerName, setBloggerName] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUserLogin, setIsLoggedIn] = useState(false); // Track login status

  const userUid = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    if (userUid) {
      setIsLoggedIn(true); // Set login status to true if user is logged in
      fetchUserRole(userUid);
      fetchStudentData(userUid);
    } else {
      setIsLoggedIn(false); // Set login status to false if no user is logged in
      setLoading(false); // Stop loading if no user is logged in
    }
  }, [userUid]);

  const fetchUserRole = async (uid) => {
    try {
      const userQuery = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.isCreatePermission) setBlogPermission(true);
          if (userData.name) setBloggerName(userData.name);
          if (userData.whoIs === "isAdmin") setIsAdmin(true);
        });
      }
    } catch (e) {
      console.error("Error fetching user role:", e);
      setError("Error fetching user role.");
    }
  };

  const fetchStudentData = async (uid) => {
    try {
      const studentRef = doc(db, "students", uid);
      const studentDoc = await getDoc(studentRef);
      if (studentDoc.exists()) {
        setStudentData(studentDoc.data());
      } else {
        setError("Student data not found.");
      }
    } catch (e) {
      console.error("Error fetching student data:", e);
      setError("An error occurred while fetching your data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        isAdmin,
        blogPermission,
        bloggerName,
        studentData,
        error,
        loading,
        isUserLogin, // Provide login status in context
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
