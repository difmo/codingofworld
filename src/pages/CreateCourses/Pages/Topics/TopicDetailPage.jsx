import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import {
  doc,
  getDoc,
  addDoc,
  getDocs,
  collection,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TopicDetailPage = () => {
  const { courseId, topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [subtopicTitle, setSubtopicTitle] = useState("");
  const [subtopicContent, setSubtopicContent] = useState(""); // Added to capture content for subtopic
  const [subtopics, setSubtopics] = useState([]);
  const [isSubtopicOpen, setIsSubtopicOpen] = useState({}); // For toggling dropdown of subtopics

  // Fetch topic data
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const topicDocRef = doc(db, "courses", courseId, "topics", topicId);
        const topicDoc = await getDoc(topicDocRef);
        if (topicDoc.exists()) {
          const topicData = topicDoc.data();
          setTopic(topicData);
          setNewTitle(topicData.title);
          setNewContent(topicData.content);
        }
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    };
    fetchTopic();
  }, [courseId, topicId]);

  // Fetch subtopics for the current topic
  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        const subtopicsCollectionRef = collection(
          db,
          "courses",
          courseId,
          "topics",
          topicId,
          "subtopics"
        );
        const subtopicsSnapshot = await getDocs(subtopicsCollectionRef);
        const subtopicsList = subtopicsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubtopics(subtopicsList);
      } catch (error) {
        console.error("Error fetching subtopics:", error);
      }
    };

    if (topicId) {
      fetchSubtopics();
    }
  }, [courseId, topicId]);

  const toggleSubtopic = (subtopicId) => {
    setIsSubtopicOpen((prevState) => ({
      ...prevState,
      [subtopicId]: !prevState[subtopicId],
    }));
  };

  // Toggle Edit Mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Save topic updates
  const handleSave = async () => {
    try {
      const topicDocRef = doc(db, "courses", courseId, "topics", topicId);
      await updateDoc(topicDocRef, {
        title: newTitle,
        content: newContent,
        createdAt: serverTimestamp(),
      });
      alert("Topic updated successfully!");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating topic:", error);
      alert("Error updating topic!");
    }
  };

  // Handle adding a subtopic
  const handleAddSubtopic = async () => {
    if (subtopicTitle && subtopicContent) {
      try {
        const subtopicsCollectionRef = collection(
          db,
          "courses",
          courseId,
          "topics",
          topicId,
          "subtopics"
        );

        await addDoc(subtopicsCollectionRef, {
          title: subtopicTitle,
          content: subtopicContent,
          createdAt: serverTimestamp(),
        });

        setSubtopicTitle("");
        setSubtopicContent("");
        alert("Subtopic added successfully!");
      } catch (error) {
        console.error("Error adding subtopic:", error);
        alert("Error adding subtopic!");
      }
    } else {
      alert("Please enter a title and content for the subtopic.");
    }
  };

  // Render subtopics as a dropdown
  const renderSubtopics = () => {
    return subtopics.map((subtopic) => (
      <div key={subtopic.id} className="mt-2">
        <button
          className="text-white hover:bg-gray-700 p-2 rounded"
          onClick={() => toggleSubtopic(subtopic.id)}
        >
          {subtopic.title} {isSubtopicOpen[subtopic.id] ? "▲" : "▼"}
        </button>

        {isSubtopicOpen[subtopic.id] && (
          <div className="pl-6 mt-2">
            <div className="text-gray-300">{subtopic.content}</div>
          </div>
        )}
      </div>
    ));
  };

  if (!topic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mt-4">
        {isEditMode ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <h3 className="text-2xl font-semibold">{topic.title}</h3>
        )}
      </div>

      <div className="mt-4">
        {isEditMode ? (
          <ReactQuill
            value={newContent}
            onChange={setNewContent}
            className="w-full"
            placeholder="Write the content of the topic here"
          />
        ) : (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: topic.content }}
          />
        )}
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={subtopicTitle}
          onChange={(e) => setSubtopicTitle(e.target.value)}
          placeholder="Enter subtopic title"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <ReactQuill
          value={subtopicContent}
          onChange={setSubtopicContent}
          className="w-full mt-4"
          placeholder="Write subtopic content here"
        />
        <button
          onClick={handleAddSubtopic}
          className="mt-2 px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Subtopic
        </button>
      </div>

      <div className="mt-6">
        <div>{renderSubtopics()}</div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={toggleEditMode}
          className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {isEditMode ? "Cancel Edit" : "Edit Topic"}
        </button>

        {isEditMode && (
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default TopicDetailPage;
