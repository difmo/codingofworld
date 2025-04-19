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
import Loader from "../../components/Loader";
import MainLoader from "../../components/MainLoader";

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
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  return (
    <div className=" dark:bg-dark transition-all duration-700 ease-in-out">
      {" "}
      <div className="flex container ">
        <div className="p-6 text-black ">
          <h1 class="text-5xl py-10 font-extrabold text-center  text-gray-900 sm:text-6xl md:text-5xl bg-gradient-to-r from-primary via-secondary to-pink-500 text-transparent bg-clip-text">
            Our Blogs
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                onClick={() => navigate(`/blogs/blog/${blog.id}`)}
                key={blog.id}
                className="p-4 border  rounded-lg cursor-pointer"
              >
                <h2 className="text-xl font-semibold  dark:text-white transition-all duration-700 ease-in-out ">
                  {blog.title}
                </h2>
                <p
                  className="mt-2 text-gray-500 dark:text-gray-50 transition-all duration-700 ease-in-out"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.slice(0, 100),
                  }}
                />
                <div className="mt-4 dark:text-white transition-all duration-700 ease-in-out">
                  <Link
                    to={`blogs/blog/${blog.id}`}
                    className="text-primary hover:text-blue-700"
                  >
                    View Blog
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBlogs;
