import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));

        console.log(querySnapshot);

        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched blogs:", blogsData);

        setBlogs(blogsData);
      } catch (err) {
        setError("Error fetching blogs: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // If no blogs, show the fallback message
  if (blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  return (
    <div className="flex">
      <div className="p-6 text-black ">
        <h1 className="mb-6 text-3xl font-semibold text-center ">All Blogs</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              onClick={()=>navigate(`/blog/${blog.id}`)}
              key={blog.id}
              className="p-4 border rounded-lg shadow-md cursor-pointer"
            >
              <h2 className="text-xl font-semibold ">
                {blog.title}
              </h2>
              <p
                className="mt-2 text-gray-400"
                dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100) }}
              />
              <div className="mt-4">
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  View Blog
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowBlogs;
