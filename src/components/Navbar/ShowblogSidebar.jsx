import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Sidebar = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Store the current user

  useEffect(() => {
    const auth = getAuth();
    
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Set the current user when the user is logged in
      } else {
        setCurrentUser(null); // Clear user state when not logged in
      }
      setLoading(false); // Stop loading after auth state is checked
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array so this runs only once

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!currentUser) {
        return; // Don't fetch blogs if no user is logged in
      }

      try {
        setLoading(true); // Set loading true before fetching
        const userId = currentUser.uid;

        // Fetch blogs that belong to the current user
        const blogsQuery = query(
          collection(db, "blogs"),
          where("userId", "==", userId)
        );

        const querySnapshot = await getDocs(blogsQuery);

        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(blogsData);
      } catch (err) {
        setError("Error fetching blogs: " + err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogs();
  }, [currentUser]); // Fetch blogs when currentUser changes

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!currentUser) {
    return <div>User is not logged in</div>;
  }

  if (blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  return (
    <div className="h-screen p-4 text-white bg-gray-800">
      <h2 className="mb-4 text-2xl font-semibold">Blog Titles</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="mb-2">
            <Link
              to={`/blog/${blog.id}`}
              className="text-blue-400 hover:text-blue-600"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
