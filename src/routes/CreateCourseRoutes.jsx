// src/routes/CourseRoutes.js
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AlldetailCourese from "../pages/AlldetailCourese";
import CourseDetails from "../pages/CourseDetails";
import InternshipDetails from "../pages/InternshipDetails";
import Courses from "../pages/Courses";
import ShowCourseDetails from "../pages/ShowCourses/Pages/ShowCourseDetail";
import ShowTopicDetailPage from "../pages/ShowCourses/Pages/Topics/ShowTopicDetailPage";
import ShowCourseLayout from "../pages/ShowCourses/Layout/ShowCourseLayout";
import ScrollToTop from "../components/ScrollTop";
import { auth, db } from "../firebase";
import NotFound from "../pages/NotFound";
import CreateCourseLayout from "../pages/CreateCourses/Layout/CreateCourseLayout";
import AllCoursesPage from "../pages/CreateCourses/Pages/AllCoursesPage";
import TopicDetailPage from "../pages/CreateCourses/Pages/Topics/TopicDetailPage";
import CreateNewCourse from "../pages/CreateCourses/Pages/CreateNewCourse";
import AddTopicPage from "../pages/CreateCourses/Pages/Topics/AddTopicPage";
import EditAndShowCourse from "../pages/CreateCourses/Pages/EditAndShowCourse";
import { collection, getDocs, query, where } from "firebase/firestore";

const CreateCourseRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [blogPermission, setBlogPermission] = useState(false);
  const [userUid, setUserUid] = useState(null);

  const [bloggerName, setbloggerName] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          setIsUserLogin(user);
          fetchUserRole(user.uid);
          setUserUid(user.uid);
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
  return <>

    <Routes>
      {isUserLogin ? (
        <Route >

          <Route element={<CreateCourseLayout />}> 
          <Route path="/" element={<AllCoursesPage />} />
            <Route path="/create-course" element={<CreateNewCourse />} />
            <Route path="/edit-and-show/:courseId" element={<EditAndShowCourse />} />
            {/* Add Topic */}
            <Route
              path="/edit-and-show/:courseId/add-topic"
              element={<AddTopicPage />}
            />
            <Route
              path="/edit-and-show/:courseId/topic/:topicId"
              element={<TopicDetailPage />}
            /></Route>


        </Route>
      ) : (
        <Route path="*" element={<NotFound />} />
      )}
    </Routes>
  </>
}



export default CreateCourseRoutes;
