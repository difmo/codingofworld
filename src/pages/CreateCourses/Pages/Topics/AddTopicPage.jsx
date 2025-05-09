import { useState, useRef } from 'react';
import { db } from '../../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const AddTopicPage = () => {
  const [topicTitle, setTopicTitle] = useState('');
  const [topicContent, setTopicContent] = useState('');
  const { courseId } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const handleSaveTopic = async () => {
    if (!topicTitle || !topicContent) {
      alert('Please enter both title and content for the topic.');
      return;
    }

    try {
      const topicsCollectionRef = collection(db, 'courses', courseId, 'topics');
      await addDoc(topicsCollectionRef, {
        title: topicTitle,
        content: topicContent,
        createdAt: new Date(),
      });

      navigate(`/create-courses/edit-and-show/${courseId}`);
    } catch (error) {
      console.error('Error adding topic:', error);
      alert('Error adding topic!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold">Add New Topic</h2>
      <div className="mt-6">
        <label className="text-lg font-medium text-gray-700">Topic Title:</label>
        <input
          type="text"
          value={topicTitle}
          onChange={(e) => setTopicTitle(e.target.value)}
          className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium text-gray-700">Topic Content:</label>
        <ReactQuill
          ref={quillRef}
          value={topicContent}
          onChange={setTopicContent}
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
          className="mt-2 w-full"
          placeholder="Write the content of your topic"
        />
        <p className="text-sm text-gray-500 mt-2">ℹ️ Table support is limited without custom modules.</p>
      </div>

      <button
        onClick={handleSaveTopic}
        className="mt-6 px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700"
      >
        Save Topic
      </button>
    </div>
  );
};

export default AddTopicPage;
