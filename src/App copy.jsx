import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

import SingUpScreen from "./pages/AuthScreens/SignUpScreen";
import LoginScreen from "./pages/AuthScreens/LoginScreen";
import SidebarLayout from "./pages/Layout/SidebarLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Routes wrapped in Layout */}
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
          <Route path="/dummy" element={<Dummy />} />
        </Route>

        <Route element={<SidebarLayout />}>
          <Route path="/dummy" element={<Dummy />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
