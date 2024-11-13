import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";


const Sidebar = (   ) => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const auth = getAuth();
          const currentUser = auth.currentUser;

          if (!currentUser) {
            setError("User is not logged in");
            setLoading(false);
            return;
          }
  
          const userId = currentUser.uid;
          console.log("hellohello",userId);


          const blogsQuery = query(
            collection(db, "blogs"),
            where("userId", "==", userId) 
          );
  

          const querySnapshot = await getDocs(blogsQuery);
          
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
  
    if (blogs.length === 0) {
      return <div>No blogs available</div>;
    }


  return (
    <div className="h-screen p-4 text-white bg-gray-800 ">
      <h2 className="mb-4 text-2xl font-semibold">Blog Titles</h2>
      <ul>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <li key={blog.id} className="mb-2">
              <Link
                to={`/blog/${blog.id}`}
                className="text-blue-400 hover:text-blue-600"
              >
                {blog.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No blogs available</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
