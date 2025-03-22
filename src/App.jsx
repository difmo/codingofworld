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
import ShowBlogLayout from "./pages/Layout/ShowBlogLayout";
import CreateCourseLayout from "./pages/CreateCourses/Layout/CreateCourseLayout";
import CreateCourseRoutes from "./routes/CreateCourseRoutes";
import CreateBlogLayout from "./pages/Layout/CreateBlogLayout";
import CreateBlogRoutes from "./routes/CreateBlogRoutes";
import AdminLayout from "./pages/Layout/AdminLayout";

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
          console.log("user role"+userData.whoIs);
          setIsAdmin(userData.whoIs === "isAdmin");
        }
      } else {
        setIsUserLogin(false);
      }
    });

    return () => unsubscribe();
  }, []);
 console.log("checking is Admin");
  console.log(isAdmin);

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
            <Route path="/blogs/*" element={<BlogRoutes />} />

          </Route>
            <Route path="/create-course/*" element={<CreateCourseRoutes />} />
            <Route path="/create-blogs/*" element={<CreateBlogRoutes/>} />

            <Route element={<AdminLayout/>}>

          {isAdmin && <Route path="/admin/*" element={<AdminRoutes />} />}
            </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
