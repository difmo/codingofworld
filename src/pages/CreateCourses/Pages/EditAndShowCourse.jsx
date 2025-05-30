import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebase';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loader from '@/components/Loader';

const EditAndShowCourse = () => {
  const [course, setCourse] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [topics, setTopics] = useState([]);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;

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
    const fetchCourse = async () => {
      try {
        const courseDocRef = doc(db, 'tutorial-courses', courseId);
        const courseDoc = await getDoc(courseDocRef);

        if (courseDoc.exists()) {
          const courseData = courseDoc.data();
          setCourse(courseData);
          setTitle(courseData.title);
          setContent(courseData.content);

          // Fetch topics for the course
          const topicsCollectionRef = collection(db, 'tutorial-courses', courseId, 'topics');
          const topicsSnapshot = await getDocs(topicsCollectionRef);
          const topicsList = topicsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTopics(topicsList);
        } else {
          console.log('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEditToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    if (user && user.uid === course.userId) {
      try {
        const courseDocRef = doc(db, 'tutorial-courses', courseId);
        await updateDoc(courseDocRef, { title, content });
        alert('Course updated successfully!');
        setIsEditMode(false);
      } catch (error) {
        console.error('Error updating course:', error);
        alert('Error updating course!');
      }
    } else {
      alert('You are not authorized to edit this course');
    }
  };

  const handleAddTopic = async () => {
    navigate(`/create-courses/edit-and-show/${courseId}/add-topic`);
  };

 
  if (!course) {
    return <div className="text-center text-xl text-gray-600"><Loader/></div>;
  }

  return (
    <div className=" mx-auto p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          {isEditMode ? 'Edit Course' : 'View Course'}
        </h2>
        <p className="text-gray-500">Manage the content of your course</p>
      </div>

      {/* Course Form */}
      <div className="bg-white  rounded-lg p-6 space-y-6">

        {/* Title Input */}
        <div>
          <label className="text-lg font-medium text-gray-700">Course Title:</label>
          {isEditMode ? (
            <input
              type="text"
              value={title}
              // onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <h3 className="text-2xl font-semibold text-gray-800 mt-2">{course.title}</h3>
          )}
        </div>

        {/* Content Area */}
        <div>
          <label className="text-lg font-medium text-gray-700">Course Content:</label>
          {isEditMode ? (
             <ReactQuill
                       id="content"
                       value={content}
                       onChange={setContent}
                       className="w-full"
                       placeholder="Write the content of your course"
                       modules={{
                         toolbar: [
                           [
                             { header: "1" },
                             { header: "2" },
                             { header: "3" },
                             { header: "4" },
                             { header: "5" },
                             { header: "6" },
                           ],
                           [{ font: [] }],
                           [{ size: ["small", "normal", "large", "huge"] }], //
           
                           ["bold", "italic", "underline"],
                           ["link"],
                           [{ list: "ordered" }, { list: "bullet" }],
                           ["blockquote", "code-block"],
                           ["image"],
                           ["clean"],
                         ],
                       }}
                     />
          ) : (
            <div
              className="mt-4 prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{   __html: replaceCodeWithLanguageClass(course?.content)
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
                .replace(/<li>/g, '<li class="dark:text-white">')   }}
            />
          )}
        </div>

        {/* Topics */}
  
            <button
              onClick={handleAddTopic}
              className="mt-4 px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add Topic
            </button>
 
        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleEditToggle}
            className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isEditMode ? 'Cancel Edit' : 'Edit Course'}
          </button>

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
    </div>
  );
};

export default EditAndShowCourse;
