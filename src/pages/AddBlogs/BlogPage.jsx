import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { getAuth } from "firebase/auth";

const BlogPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          setError("User not found");
          setLoading(false);
          return;
        }

        const userId = currentUser.uid;
        
        // Create a reference to the specific blog document
        const blogRef = doc(db, "blogs", blogId);
        const blogDoc = await getDoc(blogRef);

        if (blogDoc.exists()) {
          const blogData = blogDoc.data();

          // Check if the userId of the blog matches the logged-in user's userId
          if (blogData.userId === userId) {
            setBlog(blogData);
          } else {
            setError("You don't have permission to view this blog.");
          }
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError("Error fetching blog: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId]);
  if (loading) {
    return <div>Loading blog...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 mx-auto text-white bg-black">
      <h1 className="mb-6 text-3xl font-semibold">{blog.title}</h1>
      <div className="mb-6">
        <ReactQuill value={blog.content} readOnly={true} theme="snow" />
      </div>

      {Array.isArray(blog.fields) && blog.fields.length > 0 ? (
        blog.fields.map((field, index) => (
          <div key={index} className="mb-4">
            {field.type === "heading" && (
              <h2 className="text-2xl font-semibold">{field.value}</h2>
            )}

            {field.type === "description" && (
              <p className="text-lg">{field.value}</p>
            )}

            {field.type === "link" && (
              <a href={field.value} className="text-blue-400">
                {field.value}
              </a>
            )}

            {field.type === "image" && field.value && (
              <img
                src={field.value}
                alt="Blog Image"
                className="object-cover w-32 h-32 rounded"
              />
            )}
            {field.type === "code" && field.value && (
              <SyntaxHighlighter
                language="cpp"
                style={dracula}
                className="p-2 overflow-x-auto bg-black rounded"
              >
                {field.value}
              </SyntaxHighlighter>
            )}
          </div>
        ))
      ) : (
        <p>No additional content fields available.</p>
      )}
    </div>
  );
};

export default BlogPage;
