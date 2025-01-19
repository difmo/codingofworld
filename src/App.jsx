import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeScreen from "./pages/HomeScreen";
import Layout from "./pages/Layout/layout";
import ContactUs from "./pages/ContactUs";
import { Courses } from "./pages/Courses";
import { About } from "./pages/About";
import TrainingTeam from "./pages/OurTrainingTeam";
import InternshipsSection from "./pages/Internship";
import InternshipForm from "./pages/IntershipForm";
import TcsNqtCourse from "./pages/AllCourses/TcsNqtCourse/TcsNqtCoursedescri";
import NotFound from "./pages/NotFound";

import TCSNQT from "./pages/AllCourses/TcsNqtCourse/StartTcsNqt";
import SingUpScreen from "./pages/AuthScreens/SignUpScreen";
import LoginScreen from "./pages/AuthScreens/LoginScreen";
import First from "./pages/Sidebarpages/First";
import Second from "./pages/Sidebarpages/Second";
import FindSmallestElement from "./pages/AllCourses/TcsNqtCourse/Questions/OnArray/FindSmallestElement";

{/* /////////////////////////////////////////// Blog ///////////////////////////////////////////// */ }
import Addblogs from "./pages/AddBlogs/Addblogs";
import AllBlogs from "./pages/AddBlogs/AllBlogs";
import EditBlog from "./pages/AddBlogs/EditBlog";
import ShowBlogs from "./pages/AddBlogs/ShowBlogs";
import BlogPage from "./pages/AddBlogs/BlogPage";
import ShowBlogLayout from "./pages/Layout/ShowBlogLayout";
import AdminBlogPage from "./pages/AdminProminent/AdminblogPage";
import CreateBlogLayout from "./pages/Layout/CreateBlogLayout";
import Popupbloge from "./pages/Popupbloge";


import StudentData from "./pages/AdminProminent/student/StudentData";


{/* /////////////////////////////////////////// Admin ///////////////////////////////////////////// */ }
import AdminLayout from "./pages/Layout/AdminLayout";
import AdminDashboard from "./pages/AdminProminent/MenuPages/AdminDashboard";
import ClientContactPage from "./pages/AdminProminent/ClientContactPage";
import LoginUsersAdmin from "./pages/AdminProminent/LoginUsersAdmin";
import StudentSidebarLayout from "./pages/Layout/StudentSidebarLayout";
import Services from "./components/Services/Services";
import CoursePage from "./pages/CoursePage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";

import AlldetailCourese from "./pages/AlldetailCourese";
import CourseDetails from "./pages/CourseDetails";
import InternshipDetails from "./pages/InternshipDetails";
import ScrollToTop from "./components/ScrollTop";
import CreateNewInternship from "./pages/AdminProminent/Internship-Det/CreateNewInternship";
import AllInternship from "./pages/AdminProminent/Internship-Det/AllInternship";
import EditInternship from "./pages/AdminProminent/Internship-Det/EditInternship";
import CreatenewCourse from "./pages/AdminProminent/CourseAdmin/CreatenewCourse";
import Allcourse from "./pages/AdminProminent/CourseAdmin/Allcourse";
import EditCourse from "./pages/AdminProminent/CourseAdmin/EditCourse";
import Codowo from "./pages/Codowo/Codowo";
import { Helmet, HelmetProvider } from "react-helmet-async";
{/* /////////////////////////////////////////// Create Courses ///////////////////////////////////////////// */ }

import CreateCourseLayout from "./pages/CreateCourses/Layout/CreateCourseLayout";
import AllCoursesPage from "./pages/CreateCourses/Pages/AllCoursesPage";
import CreateNewCourse from "./pages/CreateCourses/Pages/CreateNewCourse";
import UserCoursePage from "./pages/CreateCourses/Pages/EditAndShowCourse";
import AddTopicPage from "./pages/CreateCourses/Pages/Topics/AddTopicPage";
import TopicDetailPage from "./pages/CreateCourses/Pages/Topics/TopicDetailPage";
import ShowAllCoursesPage from "./pages/ShowCourses/Pages/ShowAllCoursesPage";
import ShowCourseLayout from "./pages/ShowCourses/Layout/ShowCourseLayout";
import ShowCourseDetails from "./pages/ShowCourses/Pages/ShowCourseDetail";
import ShowTopicDetailPage from "./pages/ShowCourses/Pages/Topics/ShowTopicDetailPage";
import TestPage from "./pages/TestPages/TestPage";
import AdminStudentTestPage from "./pages/TestPages/TestAdmin";
import StudentTestDetails from "./pages/TestPages/TestDetails";
import StillWeWorkingPage from "./pages/StillWeWorkingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CertificatesGeneratorComponent from "./components/CertificatesGen/CertificatesGenerator";





const App = () => {


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




  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          Coding of World - Internships, Training, and Career Guidance
        </title>
        <meta
          name="description"
          content="Explore Coding of World for internships, training programs, and skill development in web development, mobile app development, AI/ML, and robotics. Empower your future with the latest technologies and 100% placement assistance."
        />
        <meta
          name="keywords"
          content="internship, skills, future scope, technology, new technology, coding technology, technology coding, learn technology, technology and coding, tech programming, coding and technology, tech, technology and programming, coding in technology, technology programming, IT in mobile app & web development, learn about tech, programming experience, coding solving problems, world of coding, the world of coding, internship for students, internship program, paid internships, internship opportunities, internships 2022, internship program 2022, internship website, paid internship for students, student internship program, internship opportunities 2022, technology com, student intern, 2022 internships, an internship, internship at, internship in, best training ,best training center in lucknow,coaching centre, coding of world"
        />
        <meta name="author" content="Coding of World" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Coding of World - Shape Your Future!"
        />
        <meta
          property="og:description"
          content="Join Coding of World to learn web development, mobile app development, AI/ML, and robotics with expert guidance and 100% placement assistance. Start your career today!"
        />
        <meta
          property="og:image"
          content="https://www.codingofworld.com/og-image.jpg"
        />
        <meta property="og:url" content="https://www.codingofworld.com" />
        <meta property="og:site_name" content="Coding of World" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Coding of World - Internships and Training"
        />
        <meta
          name="twitter:description"
          content="Explore Coding of World for top-notch training in web development, mobile app development, AI/ML, and robotics. Build your future in technology today!"
        />
        <meta
          name="twitter:image"
          content="https://www.codingofworld.com/twitter-image.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.codingofworld.com" />
      </Helmet>

      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          {/* //////////////////////////////////////////// Codowo ///////////////////////////////////////////// */}
          <Route>
            <Route path="/codowo" element={<Codowo />} />
          </Route>

          {/* ///////////////////////////////////////////// Main //////////////////////////////////////////// */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/trainingteam" element={<TrainingTeam />} />
            <Route path="/internship" element={<InternshipsSection />} />
            <Route path="/internshipform" element={<InternshipForm />} />
            <Route path="/tcsnqtcourse" element={<TcsNqtCourse />} />
            <Route path="/signupscreen" element={<SingUpScreen />} />
            <Route path="/loginscreen" element={<LoginScreen />} />
            <Route path="/alldeatilcourese" element={<AlldetailCourese />} />
            <Route path="/popupbloge" element={<Popupbloge />} />
            <Route path="/coursepagex" element={<CoursePage />} />
            <Route path="/details/:id" element={<CourseDetails />} />
            <Route path="/internship/:id" element={<InternshipDetails />} />
            {/* ///////////////////////////////////////////// Student Tests //////////////////////////////////////////// */}
            <Route path="/students-test" element={<TestPage />} />
            {/* /////////////////////////////////////////// Show Courses ///////////////////////////////////////////// */}
            <Route path="/show-coursee" element={<ShowAllCoursesPage />} />
            <Route path="/showcoursee/:courseId" element={<ShowCourseDetails />} />
            <Route path="/user-profile" element={<ProfilePage/>} />
            <Route path="/hello" element={<CertificatesGeneratorComponent/>} />

            <Route element={<ShowCourseLayout />}>
              <Route path="/showcourse/:courseId" element={<ShowCourseDetails />} />
              {/* Add Topic */}
              <Route path="/showcourse/:courseId/topic/:topicId" element={<ShowTopicDetailPage />} />
            </Route>

            {/* /////////////////////////////////////////// Show Blog ///////////////////////////////////////////// */}
            <Route element={<ShowBlogLayout />}>
              <Route path="/show-blogs" element={<ShowBlogs />} />
              <Route path="/blog/:blogId" element={<BlogPage />} />
            </Route>
          </Route>

          {/* //////////////////////////////////////////// Create Courses //////////////////////////////////////////// */}

          {isUserLogin ? (
            <Route element={<CreateCourseLayout />}>

              <Route path="/all-course" element={<AllCoursesPage />} />
              <Route path="/usercourse/:courseId" element={<UserCoursePage />} />
              <Route path="/create-course" element={<CreateNewCourse />} />
              {/* Add Topic */}
              <Route path="/usercourse/:courseId/add-topic" element={<AddTopicPage />} />
              <Route path="/usercourse/:courseId/topic/:topicId" element={<TopicDetailPage />} />

            </Route>
          ) : (
            <Route path="*" element={<NotFound />} />
          )}

          {/* //////////////////////////////////////////// Show Courses //////////////////////////////////////////// */}

          {/* <Route element={<ShowCourseLayout />}> */}
          {/* <Route path="/showcourse/:courseId" element={<ShowCourseDetails/>} /> */}
          {/* Add Topic */}
          {/* <Route path="/showcourse/:courseId/topic/:topicId" element={<ShowTopicDetailPage/>} /> */}
          {/* </Route> */}


          {/* /////////////////////////////////////////// Create Blog ///////////////////////////////////////////// */}
          {isUserLogin ? (
            <Route element={<CreateBlogLayout />}>
              <Route path="/addblogs" element={<Addblogs />} />
              <Route path="/all-blogs" element={<AllBlogs />} />
              <Route path="/edit-blog/:blogId" element={<EditBlog />} />
            </Route>
          ) : (
            <Route path="*" element={<NotFound />} />
          )}

          {/* //////////////////////////////////////////// Advertise /////////////////////////////////////////// */}
          <Route path="/ads.txt" />

          {/* //////////////////////////////////////////// Courses //////////////////////////////////////////// */}
          <Route element={<StudentSidebarLayout />}>
            <Route path="/home1" element={<First />} />
            <Route path="/about1" element={<Second />} />
            <Route path="/starttcsnqt" element={<TCSNQT />} />
            <Route path="/findsmallest" element={<FindSmallestElement />} />
          </Route>


          {/* /////////////////////////////////////////// Admin ////////////////////////////////////////// */}
          {isAdmin ? (
            <Route element={<AdminLayout />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/internship" element={<StudentData />} />
              <Route
                path="/admin/client-contact"
                element={<ClientContactPage />}
              />
              <Route path="/admin/blog" element={<AdminBlogPage />} />
              <Route path="/admin/login-users" element={<LoginUsersAdmin />} />
              <Route path="/admin/edit-student/:id" element={<StudentData />} />
              <Route
                path="/admin/createNewInternship"
                element={<CreateNewInternship />}
              />
              <Route path="/admin/allInternship" element={<AllInternship />} />
              <Route path="/edit-internship/:id" element={<EditInternship />} />
              <Route
                path="/admin/createnewcourse"
                element={<CreatenewCourse />}
              />
              <Route path="/admin/allcoures" element={<Allcourse />} />
              <Route path="/edit-course/:id" element={<EditCourse />} />
              <Route path="/admin/admin-student-test" element={<AdminStudentTestPage />} />
              <Route path="/admin/admin-student-test" element={<AdminStudentTestPage />} />
              <Route path="/admin/student/:studentId" element={<StudentTestDetails />} />
            </Route>
          ) : (
            <Route path="*" element={<NotFound />} />
          )}


          {/* ///////////////////////////////////////////// Other /////////////////////////////////////// */}
          <Route path="*" element={<NotFound />} />
          <Route path="/stillweworking" element={<StillWeWorkingPage/>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
