// src/routes/BlogRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import Addblogs from "../pages/AddBlogs/Addblogs";
import AllBlogs from "../pages/AddBlogs/AllBlogs";
import EditBlog from "../pages/AddBlogs/EditBlog";
import BlogPage from "../pages/AddBlogs/BlogPage";
import ShowBlogs from "../pages/AddBlogs/ShowBlogs";

const BlogRoutes = () => (
  <>
    <Route path="/addblogs" element={<Addblogs />} />
    <Route path="/all-blogs" element={<AllBlogs />} />
    <Route path="/edit-blog/:blogId" element={<EditBlog />} />
    <Route path="/blog/:blogId" element={<BlogPage />} />
    <Route path="/show-blogs" element={<ShowBlogs />} />
  </>
);

export default BlogRoutes;
