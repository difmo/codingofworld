import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const ShowBlogSidebar = ({ toggleSidebar }) => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        const blogSnapshot = await getDocs(blogsCollection);
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 bg-dark border-r px-6  mt-4 border-primary h-screen text-black   space-y-6 shadow-lg overflow-y-auto">
      
      {/* Sticky Search Input */}
      <div className="sticky top-0 bg-dark z-10 pb-2">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg border-primary dark:bg-dark  dark:text-white"
          />
      </div>

      {/* Blog List */}
      <ul className="list-disc list-inside text-sm space-y-1 font-mono">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <li key={blog.id} className="truncate whitespace-nowrap overflow-hidden">
              <Link
                to={`/blogs/blog/${blog.id}`}
                onClick={toggleSidebar}
                className="text-green-400 hover:underline block truncate"
                title={blog.title} // Tooltip shows full title on hover
              >
                {blog.title}
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No blogs found</p>
        )}
      </ul>
    </div>
  );
};

export default ShowBlogSidebar;
