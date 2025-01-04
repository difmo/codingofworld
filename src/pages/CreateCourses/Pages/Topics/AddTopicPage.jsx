import React, { useState } from 'react';
import { db, auth } from '../../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddTopicPage = () => {
  const [topicTitle, setTopicTitle] = useState('');
  const [topicContent, setTopicContent] = useState('');
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;

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
      });

      // Redirect back to the course page
      navigate(`/usercourse/${courseId}`);
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
          value={topicContent}
          onChange={setTopicContent}
          className="mt-2 w-full h-96"
          placeholder="Write the content of your topic"
        />
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
