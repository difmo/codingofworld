
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";




const BlogPage = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBlogData = async () => {
        try {
          const blogDoc = await getDoc(doc(db, "blogs", blogId));
          if (blogDoc.exists()) {
            setBlog(blogDoc.data());
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
      <div className="max-w-5xl mx-auto text-black ">
        <h1 className="mb-6 text-3xl font-semibold">{blog.title}</h1>
        <div className="mb-6 " dangerouslySetInnerHTML={{ __html: blog.content }} />

        {Array.isArray(blog.fields) && blog.fields.length > 0 ? (
          blog.fields.map((field, index) => (
            <div key={index} className="mb-4">
              {field.type === "heading" && (
                <h2 className="text-2xl font-semibold">{field.value}</h2>
              )}
  
              {field.type === "description" && (
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: field.value }} />
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
                  className="h-auto max-w-full mx-auto my-6 rounded-lg" // Centering and resizing styles
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