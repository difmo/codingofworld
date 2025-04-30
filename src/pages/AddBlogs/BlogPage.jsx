import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "react-quill/dist/quill.snow.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import MainLoader from "../../components/MainLoader";

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
    return <MainLoader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const replaceCodeWithLanguageClass = (content) => {
    return content.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
      let language = 'js'; // Default to JavaScript
      if (code.includes('def') && code.includes('print')) language = 'python';
      if (code.includes('<html') && code.includes('</html>')) language = 'html';
      if (code.includes('function') && code.includes('console.log')) language = 'javascript';
      if (code.includes('class') && code.includes('public')) language = 'java';

      // Apply Tailwind dark mode classes
      return `
        <pre class="language-${language} dark:bg-gray-800 bg-white p-4 rounded-lg overflow-x-auto">
          <code class="text-black dark:text-white">${code}</code>
        </pre>
      `;
    });
  };

  return (
    <div className="dark:bg-dark transition-all duration-700 ease-in-out dark:text-white">
      <div className="container max-w-5xl mx-auto text-black pt-9">
        <h1 className="mb-6 text-3xl font-semibold text-primary">{blog.title}</h1>

        <div
          className="p-8 rounded border-primary/40 mb-6 content-container"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {Array.isArray(blog.fields) && blog.fields.length > 0 ? (
          blog.fields.map((field, index) => (
            <div key={index} className="mb-4">
              {field.type === "heading" && (
                <h2 className="text-2xl font-semibold text-primary">
                  {field.value}
                </h2>
              )}

              <div className="max-w-5xl mx-auto text-black dark:text-white pt-9 content-container">
                {field.type === "description" && (
                  <p
                  className="prose max-w-none dark:prose-dark"
                  dangerouslySetInnerHTML={{
                      __html: replaceCodeWithLanguageClass(field.value)
                        .replace(/<h1>/g, '<h1 class="text-red-500">')
                        .replace(/<h2>/g, '<h2 class="text-red-500">')
                        .replace(/<h3>/g, '<h3 class="text-red-500">')
                        .replace(/<h4>/g, '<h4 class="text-red-500">')
                        .replace(/<\/h1>/g, '</h1>')
                        .replace(/<\/h2>/g, '</h2>')
                        .replace(/<pre><code>/g, '<pre class="language-js" style="color: black;"><code>')
                        .replace(/<\/code><\/pre>/g, '</code></pre>')
                        .replace(/<p>/g, '<p class="dark:text-white">')
                        .replace(/<strong>/g, '<strong class="text-red-500">')
                        .replace(/<ul>/g, '<ul class="list-disc dark:text-white pl-5">')
                        .replace(/<ol>/g, '<ol class="list-decimal pl-5">')
                        .replace(/<li>/g, '<li class="dark:text-white">')
                    }}
                  />
                )}
              </div>

              {field.type === "link" && (
                <a href={field.value} className="text-blue-400">
                  {field.value}
                </a>
              )}

              {field.type === "image" && field.value && (
                <img
                  src={field.value}
                  alt="Blog Image"
                  className="h-auto max-w-full mx-auto my-6 rounded-lg"
                />
              )}

              {field.type === "code" && field.value && (
                <SyntaxHighlighter
                  language="cpp"
                  style={dracula}
                  className="p-2 overflow-x-auto bg-black dark:text-white rounded"
                >
                  {field.value}
                </SyntaxHighlighter>
              )}
            </div>
          ))
        ) : (
          <p>No additional content fields available.</p>
        )}

        <div className="flex pb-8">
          <span className="ml-auto">
            --{blog.bloggerName ? blog.bloggerName : "UnKnown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
