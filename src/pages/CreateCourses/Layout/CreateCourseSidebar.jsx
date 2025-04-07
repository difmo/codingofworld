import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const CreateCourseSidebar = ({ toggleSidebar }) => {
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);
  const [subtopicsVisibility, setSubtopicsVisibility] = useState({}); // To control visibility of subtopics

  // Fetch topics from Firebase
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsCollectionRef = collection(db, "courses", courseId, "topics");
        const topicSnapshot = await getDocs(topicsCollectionRef);
        const topicsList = topicSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTopics(topicsList);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    if (courseId) {
      fetchTopics();
    }
  }, [courseId]);

  // Toggle visibility of subtopics
  const toggleSubtopics = (topicId) => {
    setSubtopicsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [topicId]: !prevVisibility[topicId], // Toggle visibility of the selected topic
    }));
  };

  return (
    <div className="w-[400px] h-screen p-4 space-y-2 text-white bg-[#212529] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col w-full p-2 border border-gray-500 rounded-lg">
        <p className="mt-2 text-xl font-bold text-center">Coding Of World</p>
      </div>

      <ul className="space-y-4">
        <li className="mt-6">
          <h3 className="text-lg font-semibold">Course Topics</h3>
          {topics.length > 0 ? (
            topics.map((topic) => (
              <div key={topic.id}>
                {/* Topic Title */}
                <div>
                  <Link
                    to={`/courses/usercourse/${courseId}/topic/${topic.id}`}
                    onClick={() => toggleSidebar()}
                    className="block px-4 text-white rounded-md hover:bg-gray-700"
                  >
                    {topic.title}
                  </Link>

                  {/* Subtopic Dropdown Button */}
                  <button
                    onClick={() => toggleSubtopics(topic.id)} // Toggle subtopics visibility
                    className="ml-4 text-gray-300 hover:text-white"
                  >
                    {subtopicsVisibility[topic.id] ? "▲" : "▼"}
                  </button>
                </div>

                {/* Subtopics - Only visible if toggled */}
                {subtopicsVisibility[topic.id] && (
                  <SubtopicsDropdown topicId={topic.id} courseId={courseId} />
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No topics available</p>
          )}
        </li>
      </ul>
    </div>
  );
};

// Subtopic dropdown component
const SubtopicsDropdown = ({ topicId, courseId }) => {
  const [subtopics, setSubtopics] = useState([]);

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
        const subtopicSnapshot = await getDocs(subtopicsCollectionRef);
        const subtopicsList = subtopicSnapshot.docs.map((doc) => ({
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
  }, [topicId, courseId]);

  return (
    <div className="ml-8 mt-2 space-y-2">
      {subtopics.length > 0 ? (
        subtopics.map((subtopic) => (
          <Link
            key={subtopic.id}
            to={`/courses/usercourse/${courseId}/topic/${topicId}/subtopic/${subtopic.id}`}
            className="block px-4 py-2 text-gray-200 rounded-md hover:bg-gray-600"
          >
            {subtopic.title}
          </Link>
        ))
      ) : (
        <p className="text-sm text-gray-400">No subtopics available</p>
      )}
    </div>
  );
};

export default CreateCourseSidebar;
