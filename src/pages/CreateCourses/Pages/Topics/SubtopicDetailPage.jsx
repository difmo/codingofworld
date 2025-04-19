import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../../../firebase";
import { doc, getDoc, collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const SubtopicDetailPage = () => {
  const { courseId, topicId, subtopicId } = useParams();
  const [subtopic, setSubtopic] = useState(null);
  const [subsubtopics, setSubsubtopics] = useState([]);
  const [newSubtopicTitle, setNewSubtopicTitle] = useState("");
  const [newSubtopicContent, setNewSubtopicContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubtopic = async () => {
      try {
        const subtopicDocRef = doc(db, "courses", courseId, "topics", topicId, "subtopics", subtopicId);
        const subtopicDoc = await getDoc(subtopicDocRef);
        if (subtopicDoc.exists()) {
          const subtopicData = subtopicDoc.data();
          setSubtopic(subtopicData);
          if (subtopicData.subtopics) {
            // Fetch subsubtopics if there are any
            const subsubtopicsRef = collection(db, "courses", courseId, "topics", topicId, "subtopics", subtopicId, "subtopics");
            const subsubtopicsSnapshot = await getDocs(subsubtopicsRef);
            const subsubtopicsList = subsubtopicsSnapshot.docs.map(doc => ({
              id: doc.id,
              title: doc.data().title,
            }));
            setSubsubtopics(subsubtopicsList);
          }
        }
      } catch (error) {
        console.error("Error fetching subtopic:", error);
      }
    };

    fetchSubtopic();
  }, [courseId, topicId, subtopicId]);

  // Handle adding a new subtopic
  const handleAddSubtopic = async () => {
    if (!newSubtopicTitle) {
      alert("Please provide a title for the subtopic");
      return;
    }
    setLoading(true);
    try {
      const subtopicsRef = collection(db, "courses", courseId, "topics", topicId, "subtopics", subtopicId, "subtopics");
      await addDoc(subtopicsRef, {
        title: newSubtopicTitle,
        content: newSubtopicContent,
        createdAt: serverTimestamp(),
      });

      // Clear input fields after adding
      setNewSubtopicTitle("");
      setNewSubtopicContent("");
      alert("Subtopic added successfully!");
    } catch (error) {
      console.error("Error adding subtopic:", error);
      alert("Error adding subtopic.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div><Loader/></div>;
  }

  if (!subtopic) {
    return <div><Loader/></div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold">{subtopic.title}</h2>
      <div
        className="prose max-w-none mt-4"
        dangerouslySetInnerHTML={{ __html: subtopic.content }}
      />

      {/* Render Subsubtopics if they exist */}
      {subsubtopics.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Subsubtopics:</h3>
          <ul>
            {subsubtopics.map((subsubtopic) => (
              <li key={subsubtopic.id}>
                <Link to={`/usercourse/${courseId}/topic/${topicId}/subtopic/${subtopicId}/subtopic/${subsubtopic.id}`}>
                  {subsubtopic.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add New Subtopic */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Add New Subtopic</h3>
        <input
          type="text"
          value={newSubtopicTitle}
          onChange={(e) => setNewSubtopicTitle(e.target.value)}
          placeholder="Enter subtopic title"
          className="w-full p-2 border border-gray-300 rounded-lg mt-2"
        />
        <textarea
          value={newSubtopicContent}
          onChange={(e) => setNewSubtopicContent(e.target.value)}
          placeholder="Enter subtopic content"
          className="w-full p-2 border border-gray-300 rounded-lg mt-2"
          rows="4"
        ></textarea>
        <button
          onClick={handleAddSubtopic}
          className="mt-4 px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Subtopic
        </button>
      </div>
    </div>
  );
};

export default SubtopicDetailPage;
