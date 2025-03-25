// src/routes/AuthRoutes.js
import React from "react";
import { Route,Routes } from "react-router-dom";
import SingUpScreen from "../pages/AuthScreens/SignUpScreen";
import LoginScreen from "../pages/AuthScreens/LoginScreen";

const AuthRoutes = () => (
  <>
  <Routes>
    <Route path="/signup" element={<SingUpScreen />} />
    <Route path="/signin" element={<LoginScreen />} />
    </Routes>
  </>
);

export default AuthRoutes;
