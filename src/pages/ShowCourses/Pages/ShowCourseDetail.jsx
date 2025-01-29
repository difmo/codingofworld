import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebase';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ShowCourseDetails = () => {
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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseDocRef = doc(db, 'courses', courseId);
        const courseDoc = await getDoc(courseDocRef);

        if (courseDoc.exists()) {
          const courseData = courseDoc.data();
          setCourse(courseData);
          setTitle(courseData.title);
          setContent(courseData.content);

          // Fetch topics for the course
          const topicsCollectionRef = collection(db, 'courses', courseId, 'topics');
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
        const courseDocRef = doc(db, 'courses', courseId);
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
    navigate(`/showcourse/${courseId}`);
  };

 
  if (!course) {
    return <div className="text-center text-xl text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}


      {/* Course Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">

        {/* Title Input */}
        <div>
          <label className="text-lg font-medium text-gray-700">Course Title:</label>
          {isEditMode ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={content}
              onChange={setContent}
              className="mt-2 w-full h-96"
              placeholder="Write the content of your course"
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }],
                  [{ 'font': [] }],
                  [{ 'size': ['small', 'normal', 'large', 'huge'] }],
                  ['bold', 'italic', 'underline'],
                  ['link'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['blockquote', 'code-block'],
                  ['image'],
                  ['clean']
                ]
              }}
            />
          ) : (
            <div
              className="mt-4 prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: course.content }}
            />
          )}
        </div>

        {/* Topics */}
  
            <button
              onClick={handleAddTopic}
              className="mt-4 px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Enroll Free
            </button>
 
        {/* Buttons */}
      
      </div>
    </div>
  );
};

export default ShowCourseDetails;
