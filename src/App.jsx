// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { auth, db } from "./firebase";
import { getDocs, query, collection, where } from "firebase/firestore";

// Import route files
import MainRoutes from "./routes/MainRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import BlogRoutes from "./routes/BlogRoutes";
import CourseRoutes from "./routes/CourseRoutes";
import NotFound from "./pages/NotFound";
import MainLayout from "./pages/Layout/layout";
import JobsOfferRoute from "./routes/JobOffersRoutes";
import ScrollToTop from "./components/ScrollTop";
import PremiumCourses from "./pages/PremiumCourses";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsUserLogin(user);
        // Fetch user role logic here
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setIsAdmin(userData.role === "admin");
        }
      } else {
        setIsUserLogin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        {/* Meta tags here */}
      </Helmet>
      <Router>
      <ScrollToTop />
        <Routes>
        <Route path="/premium-courses" element={<PremiumCourses />} />
          <Route element={<MainLayout />}>
            <Route path="/*" element={<MainRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/carrer/*" element={<JobsOfferRoute />} />
            <Route path="/courses/*" element={<CourseRoutes />} />

          </Route>
          <Route path="/blog/*" element={<BlogRoutes />} />
          {isAdmin && <Route path="/admin/*" element={<AdminRoutes />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
