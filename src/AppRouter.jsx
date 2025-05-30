

import { Route, Routes, useLocation } from "react-router-dom";

import MainRoutes from "./routes/MainRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import BlogRoutes from "./routes/BlogRoutes";
import CourseRoutes from "./routes/CourseRoutes";
import NotFound from "./pages/NotFound";
import MainLayout from "./pages/Layout/layout";
import JobsOfferRoute from "./routes/JobOffersRoutes";
import ScrollToTop from "./components/ScrollTop";
import PremiumCourses from "./pages/MicroFrontend/PremiumCourses";
import CreateCourseRoutes from "./routes/CreateCourseRoutes";
import CreateBlogRoutes from "./routes/CreateBlogRoutes";
import AdminLayout from "./pages/Layout/AdminLayout";
import Loader from "./components/Loader";
import { useProfile } from "./context/Providers/ProfileContext";
import UserProfileRoute from "./routes/ProfileRoutes";
import PublicNotes from "./pages/CowPublicNotes";
import DartEditor from "./pages/EditorForProgramming/GeneralEditor";
import PromptHub from "./pages/MicroFrontend/PromptHub";
import React, { useEffect } from "react";
import TalentMeet from "./pages/MicroFrontend/TalentMeet";
import RouteConstants from "./utils/RouteConstants.jsx";


const AppRouter = () => {
  const { isAdmin, loading } = useProfile();
  const location = useLocation();

  useEffect(() => {
    window.parent.postMessage({ pathname: location.pathname }, '*');
  }, [location]);

  if (loading) return <Loader />;

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/premium-courses/*" element={<PremiumCourses />} />
        <Route path="/prompt-hub/*" element={<PromptHub />} />
        <Route path="/talent-meet/*" element={<TalentMeet />} />

        <Route path="/cow-notes" element={<PublicNotes />} />
        <Route path="/code-editor" element={<DartEditor />} />
        <Route path={RouteConstants.ROOTROUTE.AUTH} element={<AuthRoutes />} />

        <Route element={<MainLayout />}>
          <Route path={RouteConstants.ROOTROUTE.HOME} element={<MainRoutes />} />
          <Route path={RouteConstants.ROOTROUTE.CAREER} element={<JobsOfferRoute />} />
          <Route path={RouteConstants.ROOTROUTE.COURSES} element={<CourseRoutes />} />
          <Route path={RouteConstants.ROOTROUTE.BLOGS} element={<BlogRoutes />} />
          <Route path="/profile/*" element={<UserProfileRoute />} />
        </Route>

        <Route path={RouteConstants.ROOTROUTE.CREATECOURSES} element={<CreateCourseRoutes />} />
        <Route path={RouteConstants.ROOTROUTE.CREATEBLOGS} element={<CreateBlogRoutes />} />

        <Route element={<AdminLayout />}>
          {isAdmin && <Route path={RouteConstants.ROOTROUTE.ADMIN} element={<AdminRoutes />} />}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default AppRouter;