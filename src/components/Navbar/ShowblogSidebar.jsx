import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Sidebar = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); 
      } else {
        setCurrentUser(null);
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []); 

  useEffect(() => {
    const fetchBlogs = async () => {
  

      try {
        setLoading(true); 

        const blogsQuery = query(
          collection(db, "blogs"),
         
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
        setLoading(false); 
      }
    };

    fetchBlogs();
  }, [currentUser]); 

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-screen p-4 text-black border-r">
      <h2 className="mb-4 text-2xl font-semibold ">Topics</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="mb-2 ">
            <Link
              to={`/blog/${blog.id}`}
              className=" text-primary hover:text-blue-600"
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
