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
import AdsFile from "./AdsFile/AdsFile";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);  // Add a loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsUserLogin(user);
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setIsAdmin(userData.whoIs === "isAdmin");
        }
      } else {
        setIsUserLogin(false);
      }
      setLoading(false);  // Set loading to false after the authentication check
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show a loading screen while the auth state is being checked
  }

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Coding of World - Internships, Training, and Career Guidance</title>
        <meta
          name="description"
          content="Explore Coding of World for internships, training programs, and skill development in web development, mobile app development, AI/ML, and robotics. Empower your future with the latest technologies and 100% placement assistance."
        />
        <meta
          name="keywords"
          content="internship, skills, future scope, technology, new technology, coding technology, technology coding, learn technology, technology and coding, tech programming, coding and technology, tech, technology and programming, coding in technology, technology programming, IT in mobile app & web development, learn about tech, programming experience, coding solving problems, world of coding, the world of coding, internship for students, internship program, paid internships, internship opportunities, internships 2022, internship program 2022, internship website, paid internship for students, student internship program, internship opportunities 2022, technology com, student intern, 2022 internships, an internship, internship at, internship in, best training ,best training center in lucknow,coaching centre, coding of world"
        />
        <meta name="author" content="Coding of World" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Coding of World - Shape Your Future!"
        />
        <meta
          property="og:description"
          content="Join Coding of World to learn web development, mobile app development, AI/ML, and robotics with expert guidance and 100% placement assistance. Start your career today!"
        />
        <meta
          property="og:image"
          content="https://www.codingofworld.com/og-image.jpg"
        />
        <meta property="og:url" content="https://www.codingofworld.com" />
        <meta property="og:site_name" content="Coding of World" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Coding of World - Internships and Training"
        />
        <meta
          name="twitter:description"
          content="Explore Coding of World for top-notch training in web development, mobile app development, AI/ML, and robotics. Build your future in technology today!"
        />
        <meta
          name="twitter:image"
          content="https://www.codingofworld.com/twitter-image.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.codingofworld.com" />
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
          <Route path="/create-blogs/*" element={<CreateBlogRoutes />} />
          <Route element={<AdminLayout />}>
            {isAdmin && <Route path="/admin/*" element={<AdminRoutes />} />}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
