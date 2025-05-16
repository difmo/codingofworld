import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

const SubtopicPage = () => {
  const { courseId, topicId, subtopicId } = useParams();
  const [subtopic, setSubtopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const replaceCodeWithLanguageClass = (content) => {
    return content.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
      let language = 'js'; // Default to JavaScript
      if (code.includes('def') && code.includes('print')) language = 'python';
      if (code.includes('<html') && code.includes('</html>')) language = 'html';
      if (code.includes('function') && code.includes('console.log')) language = 'javascript';
      if (code.includes('class') && code.includes('public')) language = 'java';
      return `<pre class="language-${language}"><code>${code}</code></pre>`;
    });
  };
  useEffect(() => {
    const fetchSubtopic = async () => {
      try {
        const subtopicRef = doc(
          db,
          "courses",
          courseId,
          "topics",
          topicId,
          "subtopics",
          subtopicId
        );
        const subtopicSnap = await getDoc(subtopicRef);

        if (subtopicSnap.exists()) {
          setSubtopic(subtopicSnap.data());
        } else {
          setError("Subtopic not found.");
        }
      } catch (err) {
        console.error("Error fetching subtopic:", err);
        setError("Failed to fetch subtopic.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId && topicId && subtopicId) {
      fetchSubtopic();
    }
  }, [courseId, topicId, subtopicId]);

  if (loading) {
    return <p className="text-white p-4">Loading subtopic...</p>;
  }

  if (error) {
    return <p className="text-red-500 p-4">{error}</p>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">{subtopic.title}</h1>
      <div className="prose prose-invert max-w-none">
        <div
            className="prose max-w-none dark:prose-dark"
            dangerouslySetInnerHTML={{
              __html: replaceCodeWithLanguageClass(subtopic?.content)
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
      </div>    
    </div>
  );
};

export default SubtopicPage;
