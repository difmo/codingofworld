import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../firebase";
import { doc, getDocs, getDoc, updateDoc, where, collection, query } from "firebase/firestore";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS for styling
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme for code blocks
import Prism from "prismjs";
import Loader from "../../../../components/Loader";

const ShowTopicDetailPage = () => {
  const [topic, setTopic] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const { courseId, topicId } = useParams();
  const [admin, setIsAdmin] = useState(false);
  const [blogPermission, setBlogPermission] = useState(false);
  const [userLogin, setIsUserLogin] = useState(false);
  const [bloggerName, setBloggerName] = useState();

  // Check for theme preference and set body class
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          setIsUserLogin(user);
          fetchUserRole(user.uid);
        } else {
          console.log("Email is not verified yet");
        }
      } else {
        setIsAdmin(false);
        setIsUserLogin(false);
        console.log("User is not logged in yet");
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (uid) => {
    try {
      const userQuery = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.isCreatePermission === true) {
            setBlogPermission(true);
          }
          if (userData.name) {
            setBloggerName(userData.name);
          }
          if (userData.whoIs === "isAdmin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });
      } else {
        console.log("No user found with uid");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const topicDocRef = doc(db, 'courses', courseId, 'topics', topicId);
        const topicDoc = await getDoc(topicDocRef);

        if (topicDoc.exists()) {
          const topicData = topicDoc.data();
          setTopic(topicData);
          setNewTitle(topicData.title);
          setNewContent(topicData.content);
        } else {
          console.log('Topic not found');
        }
      } catch (error) {
        console.error('Error fetching topic:', error);
      }
    };

    fetchTopic();
  }, [courseId, topicId]);

  useEffect(() => {
    // Highlight code after the component mounts (for Prism)
    Prism.highlightAll();
  }, [topic?.content]);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const topicDocRef = doc(db, 'courses', courseId, 'topics', topicId);
      await updateDoc(topicDocRef, {
        title: newTitle,
        content: newContent,
      });
      alert('Topic updated successfully!');
      setIsEditMode(false); // Switch back to show mode after saving
    } catch (error) {
      console.error('Error updating topic:', error);
      alert('Error updating topic!');
    }
  };

  if (!topic) {
    return <div className="text-center text-xl text-gray-600"><Loader /></div>;
  }

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

  return (
    <div className="max-w-4xl mx-auto p-0 md:p-6">
      <div className="mt-4">
        {isEditMode ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
        ) : (
          <h3 className="text-xl md:text-4xl text-secondaryblue dark:text-white font-semibold">{topic.title}</h3>
        )}
      </div>

      <div className="mt-4">
        {isEditMode ? (
          <ReactQuill
            value={newContent}
            onChange={setNewContent}
            className="w-full h-96"
            placeholder="Write the content of the topic here"
            formats={['bold', 'italic', 'underline', 'link', 'blockquote', 'code-block']}
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, 'bold', 'italic', 'link'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['blockquote', 'code-block'],
                ['link', 'image'],
                ['clean']
              ],
            }}
          />
        ) : (
          <div
            className="prose max-w-none dark:prose-dark"
            dangerouslySetInnerHTML={{
              __html: replaceCodeWithLanguageClass(topic?.content)
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

      <div className="flex justify-between items-center mt-6">
        {blogPermission && (
          <button
            onClick={toggleEditMode}
            className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isEditMode ? "Cancel Edit" : "Edit Topic"}
          </button>
        )}
        {isEditMode && (
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowTopicDetailPage;
