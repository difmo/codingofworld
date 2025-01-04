import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, auth } from '../../../firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'; 

const CreateNewCourse = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to create a course!');
      return;
    }

    try {
      // Create a unique course ID
      const courseId = uuidv4();
      const courseData = {
        title,
        content,
        userId: user.uid,
        createdAt: new Date(),
      };

      // Save the course to Firestore
      const courseRef = doc(collection(db, 'courses'), courseId);
      await setDoc(courseRef, courseData);

      alert('Course created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course!');
    }
  };

  return (
    <div className="create-course-container">
      <h2>Create New Course</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <ReactQuill
            id="content"
            value={content}
            onChange={setContent}
            className="w-full"
            placeholder="Write the content of your course"
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'header': '4' }, { 'header': '5' }, { 'header': '6' }],
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
        </div>

        <div className="form-group">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewCourse;
