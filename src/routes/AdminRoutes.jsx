// src/routes/AdminRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminProminent/MenuPages/AdminDashboard";
import ClientContactPage from "../pages/AdminProminent/ClientContactPage";
import LoginUsersAdmin from "../pages/AdminProminent/LoginUsersAdmin";
import StudentData from "../pages/AdminProminent/student/StudentData";
import CreateNewInternship from "../pages/AdminProminent/Internship-Det/CreateNewInternship";
import AllInternship from "../pages/AdminProminent/Internship-Det/AllInternship";
import EditInternship from "../pages/AdminProminent/Internship-Det/EditInternship";
import Pricing from "../pages/Pricing";
import NotFound from "../pages/NotFound";
import AdminPricing from "../pages/AdminProminent/CoursePlan/Pricing";
import CreatePopUpBanner from "../pages/AdminProminent/CreatePopUpBanner";
import StudentTestDetails from "../pages/TestPages/TestDetails";
import Allcourse from "../pages/AdminProminent/CourseAdmin/Allcourse";
import CreateStatistics from "../pages/AdminProminent/CreateStatistics";
import CreateAdminTrainingPrograms from "../pages/AdminProminent/CreateAdminTrainingProgramsShort";
import AdminBlogPage from "../pages/AdminProminent/AdminblogPage";
import Admincourse from "../pages/AdminProminent/Admincourse";
import EditAndShowCourse from "../pages/CreateCourses/Pages/EditAndShowCourse";
import CreateLiveNewInternship from "../pages/AdminProminent/CreateNewIntership/CreateLiveNewInternship";
import CreatenewCourse from "@/pages/AdminProminent/CourseAdmin/CreatenewCourse";
import EditCourse from "@/pages/AdminProminent/CourseAdmin/EditCourse";

const AdminRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/internship" element={<StudentData />} />
      <Route path="/client-contact" element={<ClientContactPage />} />
      <Route path="/login-users" element={<LoginUsersAdmin />} />
      <Route path="/createNewInternship" element={<CreateNewInternship />} />
      <Route path="/allInternship" element={<AllInternship />} />
      <Route path="/edit-internship/:id" element={<EditInternship />} />
      <Route path="/student/plan" element={<AdminPricing />} />
      <Route path="/create-banner" element={<CreatePopUpBanner />} />
      <Route path="/admin-student-test" element={<StudentTestDetails />} />
      <Route path="/edit-and-show/:courseId" element={<EditAndShowCourse />} />
      <Route path="/all-courses" element={<Allcourse />} />
      <Route path="/add-course" element={<CreatenewCourse />} />
      <Route path="/edit-course/:id" element={<EditCourse />} />
      <Route path="/create-stats" element={<CreateStatistics />} />
      <Route
        path="/create-new-intership"
        element={<CreateLiveNewInternship />}
      />
      <Route
        path="/create-home-programs"
        element={<CreateAdminTrainingPrograms />}
      />
      <Route path="/blogs" element={<AdminBlogPage />} />
      {/* <Route path="/blogs" element={<CreateStatistics/>} /> */}
      <Route path="/admin-course" element={<Admincourse />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default AdminRoutes;
