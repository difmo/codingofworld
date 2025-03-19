// src/routes/MainRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import ContactUs from "../pages/ContactUs";
import Services from "../components/Services/Services";
import Courses from "../pages/Courses";
import About from "../pages/About";
import TrainingTeam from "../pages/OurTrainingTeam";
import InternshipsSection from "../pages/Internship";
import InternshipForm from "../pages/IntershipForm";
import NotFound from "../pages/NotFound";
import CourseRoutes from "./CourseRoutes";

const MainRoutes = () => (
    <Routes>      
            <Route path="/" element={<HomeScreen />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/services" element={<Services />} />
            {/* <Route path="/courses" element={<Courses />} /> */}
       
            <Route path="/about" element={<About />} />
            <Route path="/trainingteam" element={<TrainingTeam />} />
            <Route path="/programs" element={<InternshipsSection />} />
            <Route path="/internshipform" element={<InternshipForm />} />
            <Route path="*" element={<NotFound />} />
    </Routes>
);

export default MainRoutes;
