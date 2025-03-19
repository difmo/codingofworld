// src/routes/CourseRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import AlldetailCourese from "../pages/AlldetailCourese";
import CourseDetails from "../pages/CourseDetails";
import InternshipDetails from "../pages/InternshipDetails";
import Courses from "../pages/Courses";
import ShowCourseDetails from "../pages/ShowCourses/Pages/ShowCourseDetail";
import ShowTopicDetailPage from "../pages/ShowCourses/Pages/Topics/ShowTopicDetailPage";
import ShowCourseLayout from "../pages/ShowCourses/Layout/ShowCourseLayout";
import ScrollToTop from "../components/ScrollTop";

const CourseRoutes = () => (
  <>

   
    <Routes>
      <Route path="/" element={<Courses />} />
      <Route path="/alldeatilcourese" element={<AlldetailCourese />} />
      <Route path="/details/:id" element={<CourseDetails />} />
      <Route path="/internship/:id" element={<InternshipDetails />} />
      <Route element={<ShowCourseLayout />}>
      
        <Route
          path="/showcoursee/:courseId"
          element={<ShowCourseDetails />}
        />
        <Route
          path="/showcoursee/:courseId/topic/:topicId"
          element={<ShowTopicDetailPage />}
        />
      </Route>


    </Routes>
  </>
);

export default CourseRoutes;
