// src/routes/CourseRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import AlldetailCourese from "../pages/AlldetailCourese";
import CourseDetails from "../pages/CourseDetails";
import InternshipDetails from "../pages/InternshipDetails";

const CourseRoutes = () => (
  <>
    <Route path="/alldeatilcourese" element={<AlldetailCourese />} />
    <Route path="/details/:id" element={<CourseDetails />} />
    <Route path="/internship/:id" element={<InternshipDetails />} />
  </>
);

export default CourseRoutes;
