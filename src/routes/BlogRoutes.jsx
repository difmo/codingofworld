import { Route, Routes } from "react-router-dom";
import BlogPage from "../pages/AddBlogs/BlogPage";
import ShowBlogs from "../pages/AddBlogs/ShowBlogs";

const BlogRoutes = () => {
  return (
    <Routes>

          <Route path="/show-blogs" element={<ShowBlogs />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
     
    </Routes>
  );
};

export default BlogRoutes;
