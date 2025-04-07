// src/routes/AuthRoutes.js
import React from "react";
import { Route,Routes } from "react-router-dom";
import SingUpScreen from "../pages/AuthScreens/SignUpScreen";
import LoginScreen from "../pages/AuthScreens/LoginScreen";
import ProfilePage from "../pages/ProfilePage/ProfilePage copy";

const ProfileRoutes = () => (
  <>
  <Routes>
    <Route path="/" element={<ProfilePage />} />
    </Routes>
  </>
);

export default ProfileRoutes;
