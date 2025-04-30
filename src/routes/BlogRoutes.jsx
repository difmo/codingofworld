import { Route, Routes } from "react-router-dom";
import BlogPage from "../pages/AddBlogs/BlogPage";
import ShowBlogs from "../pages/AddBlogs/ShowBlogs";
import ShowBlogLayoutNew from "@/pages/AddBlogs/Layout/ShowBlogLayout";

const BlogRoutes = () => {
  return (
    <Routes>
      <Route element={<ShowBlogLayoutNew />}>


        <Route path="/blog/:blogId" element={<BlogPage />} />
      </Route>

      <Route path="/show-blogs" element={<ShowBlogs />} />

    </Routes>
  );
};

export default BlogRoutes;
