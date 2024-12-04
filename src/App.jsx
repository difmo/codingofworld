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
import Addblogs from "./pages/AddBlogs/Addblogs";
import AllBlogs from "./pages/AddBlogs/AllBlogs";
import EditBlog from "./pages/AddBlogs/EditBlog";
import ShowBlogs from "./pages/AddBlogs/ShowBlogs";
import BlogPage from "./pages/AddBlogs/BlogPage";
import ShowBlogLayout from "./pages/Layout/ShowBlogLayout";
import StudentData from "./pages/AdminProminent/student/StudentData";
import AdminLayout from "./pages/Layout/AdminLayout";
import AdminDashboard from "./pages/AdminProminent/MenuPages/AdminDashboard";
import ClientContactPage from "./pages/AdminProminent/ClientContactPage";
import LoginUsersAdmin from "./pages/AdminProminent/LoginUsersAdmin";
import CreateBlogLayout from "./pages/Layout/CreateBlogLayout";
import Popupbloge from "./pages/Popupbloge";
import StudentSidebarLayout from "./pages/Layout/StudentSidebarLayout";
import AdminBlogPage from "./pages/AdminProminent/AdminblogPage";
import Services from "./components/Services/Services";
import CoursePage from "./pages/CoursePage";
import AdminController from "./Controller/AdminController";

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

const App = () => {
  const { isAdmin, isUserLogin } = AdminController();
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
              
        {/* solve quesiton area  */}
        <Route>

        <Route path="/codowo" element={<Codowo />} />

        </Route>
        
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

          <Route element={<ShowBlogLayout />}>
            <Route path="/show-blogs" element={<ShowBlogs />} />
            <Route path="/blog/:blogId" element={<BlogPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/ads.txt" />
        <Route element={<StudentSidebarLayout />}>
          <Route path="/home1" element={<First />} />
          <Route path="/about1" element={<Second />} />
          <Route path="/starttcsnqt" element={<TCSNQT />} />
          <Route path="/findsmallest" element={<FindSmallestElement />} />
        </Route>
        {isUserLogin ? (
          <Route element={<CreateBlogLayout />}>
            <Route path="/addblogs" element={<Addblogs />} />
            <Route path="/all-blogs" element={<AllBlogs />} />
            <Route path="/edit-blog/:blogId" element={<EditBlog />} />
          </Route>
        ) : (
          <Route path="*" element={<NotFound />} />
        )}

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
          </Route>
        ) : (
          <Route path="*" element={<NotFound />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
