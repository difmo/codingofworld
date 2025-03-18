// src/routes/AdminRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminProminent/MenuPages/AdminDashboard";
import ClientContactPage from "../pages/AdminProminent/ClientContactPage";
import LoginUsersAdmin from "../pages/AdminProminent/LoginUsersAdmin";
import StudentData from "../pages/AdminProminent/student/StudentData";
import CreateNewInternship from "../pages/AdminProminent/Internship-Det/CreateNewInternship";
import AllInternship from "../pages/AdminProminent/Internship-Det/AllInternship";
import EditInternship from "../pages/AdminProminent/Internship-Det/EditInternship";

const AdminRoutes = () => (
  <>
    <Route path="/admin-dashboard" element={<AdminDashboard />} />
    <Route path="/admin/internship" element={<StudentData />} />
    <Route path="/admin/client-contact" element={<ClientContactPage />} />
    <Route path="/admin/login-users" element={<LoginUsersAdmin />} />
    <Route path="/admin/createNewInternship" element={<CreateNewInternship />} />
    <Route path="/admin/allInternship" element={<AllInternship />} />
    <Route path="/edit-internship/:id" element={<EditInternship />} />
  </>
);

export default AdminRoutes;
