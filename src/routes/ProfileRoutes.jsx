import { Route, Routes } from "react-router-dom";

import BlogPage from "../pages/AddBlogs/BlogPage";
import ShowBlogs from "../pages/AddBlogs/ShowBlogs";


const UserProfile = () => {


  return (
    <Routes>

          <Route path="/" element={<UserProfile />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
     
    </Routes>
  );
};

export default UserProfile;
