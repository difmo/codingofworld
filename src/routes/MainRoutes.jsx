// src/routes/MainRoutes.js
import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import ContactUs from "../pages/ContactUs";
import Services from "../components/Services/Services";
import About from "../pages/About";
import TrainingTeam from "../pages/OurTrainingTeam";
import InternshipsSection from "../pages/Internship";
import InternshipForm from "../pages/IntershipForm";
import NotFound from "../pages/NotFound";
import RouteConstants from "../constants/routeConstants/RouteConstants";
import ProfileRoutes from "./ProfileRoutes";

const MainRoutes = () => (
    <Routes>
        <Route path={RouteConstants.MAINROUTE.HOME} element={<HomeScreen />} />
        <Route path={RouteConstants.MAINROUTE.CONTACTUS} element={<ContactUs />} />
        <Route path={RouteConstants.MAINROUTE.SERVICES} element={<Services />} />
        <Route path={RouteConstants.MAINROUTE.USERPROFILE} element={<ProfileRoutes />} />
        <Route path={RouteConstants.MAINROUTE.ABOUT} element={<About />} />
        <Route path={RouteConstants.MAINROUTE.TRAININGTEAM} element={<TrainingTeam />} />
        <Route path={RouteConstants.MAINROUTE.PROGRAMS} element={<InternshipsSection />} />
        <Route path={RouteConstants.MAINROUTE.INTERNSHIPFORM} element={<InternshipForm />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default MainRoutes;
