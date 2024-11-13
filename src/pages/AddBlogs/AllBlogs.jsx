import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase"; 
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        const querySnapshot = await getDocs(blogsCollection);
        const blogsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs(blogs.filter(blog => blog.id !== id)); 
    } catch (error) {
      console.error("Error deleting blog: ", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);  
  };

  return (
    <div className="p-6 mx-auto text-white bg-black">
      <h1 className="mb-6 text-3xl font-semibold text-center">All Blogs</h1>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-4 bg-gray-800 rounded-lg shadow-md cursor-pointer"
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="mt-2">{blog.content.substring(0, 100)}...</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
