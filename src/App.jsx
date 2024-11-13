import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importing pages
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
import Dummy from "./pages/dummy";

import TCSNQT from "./pages/AllCourses/TcsNqtCourse/StartTcsNqt";
import SingUpScreen from "./pages/AuthScreens/SignUpScreen";
import LoginScreen from "./pages/AuthScreens/LoginScreen";
import First from "./pages/Sidebarpages/First";
import Second from "./pages/Sidebarpages/Second";
import SidebarLayout from "./pages/Layout/SidebarLayout";
import FindSmallestElement from "./pages/AllCourses/TcsNqtCourse/Questions/OnArray/FindSmallestElement";
import BlogLayout from "./pages/Layout/BlogLayout";
import Addblogs from "./pages/AddBlogs/Addblogs";
import UserDetails from "./components/UserProfile/UserDetails";
import AllBlogs from "./pages/AddBlogs/AllBlogs";
import EditBlog from "./pages/AddBlogs/EditBlog";
import ShowBlogs from "./pages/AddBlogs/ShowBlogs";
import BlogPage from "./pages/AddBlogs/BlogPage";
import Sidebar from "./components/Navbar/ShowblogSidebar";
import ShowBlogLayout from "./pages/Layout/ShowBlogLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/trainingteam" element={<TrainingTeam />} />
          <Route path="/internship" element={<InternshipsSection />} />
          <Route path="/internshipform" element={<InternshipForm />} />
          <Route path="/tcsnqtcourse" element={<TcsNqtCourse />} />
          <Route path="/signupscreen" element={<SingUpScreen />} />
          <Route path="/loginscreen" element={<LoginScreen />} />
          <Route path="/userdetails" element={<UserDetails />} />

        <Route element={<ShowBlogLayout />}>
          <Route path="/show-blogs" element={<ShowBlogs />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
        </Route>

        </Route>


        <Route path="*" element={<NotFound />} />
        <Route path="/ads.txt" />

        <Route element={<SidebarLayout />}>
          <Route path="/home1" element={<First />} />
          <Route path="/about1" element={<Second />} />
          <Route path="/starttcsnqt" element={<TCSNQT />} />
          <Route path="/findsmallest" element={<FindSmallestElement />} />
        </Route>

        <Route element={<BlogLayout />}>
          <Route path="/addblogs" element={<Addblogs />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/edit-blog/:blogId" element={<EditBlog />} />
        </Route>

        <Route path="/dummy" element={<Dummy />} />
      </Routes>
    </Router>
  );
};

export default App;
