import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "react-quill/dist/quill.snow.css";
import Loader from "../../components/Loader";

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (err) {
        setError("Error fetching blogs: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Optional: Scroll to top on page change
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dark:bg-dark transition-all duration-700 ease-in-out min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl py-10 font-extrabold text-center text-gray-900 sm:text-6xl md:text-5xl bg-gradient-to-r from-primary via-secondary to-pink-500 text-transparent bg-clip-text">
          Our Blogs
        </h1>

        {/* Search Input */}
        <div className="mb-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="w-full px-4 py-2 border rounded-lg dark:bg-dark border-gray-400 dark:text-white"
          />
        </div>

        {/* Blog Cards */}
        {currentBlogs.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentBlogs.map((blog) => (
              <div
                onClick={() => navigate(`/blogs/blog/${blog.id}`)}
                key={blog.id}
                className="p-4 border rounded-lg cursor-pointer dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold dark:text-white">
                  {blog.title}
                </h2>
                <p
                  className="mt-2 text-gray-500 dark:text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: blog.content?.slice(0, 100) || "",
                  }}
                />
                <div className="mt-4">
                  <Link
                    to={`/blogs/blog/${blog.id}`}
                    className="text-primary hover:text-blue-700"
                  >
                    View Blog
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex pb-6 justify-center mt-10 space-x-2 text-sm">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50 dark:text-white"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded dark:text-white ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50 dark:text-white"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBlogs;
