// src/routes/AuthRoutes.js
import { Route,Routes } from "react-router-dom";
import SingUpScreen from "../pages/AuthScreens/SignUpScreen";
import LoginScreen from "../pages/AuthScreens/LoginScreen";
import RouteConstants from "@/utils/RouteConstants";

const AuthRoutes = () => (
  <>
  <Routes>
    <Route path={RouteConstants.AUTHROUTE.REGISTER} element={<SingUpScreen />} />
    <Route path={RouteConstants.AUTHROUTE.LOGIN} element={<LoginScreen />} />
    </Routes>
  </>
);

export default AuthRoutes;
