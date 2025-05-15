import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

const CreateCourseSidebar = ({ toggleSidebar }) => {
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);
  const [subtopicsVisibility, setSubtopicsVisibility] = useState({});
  const [subtopicsData, setSubtopicsData] = useState({}); // Stores subtopics for each topic

  useEffect(() => {
    if (!courseId) return;

    const topicsCollectionRef = collection(db, "courses", courseId, "topics");

    const unsubscribe = onSnapshot(topicsCollectionRef, async (snapshot) => {
      const fetchedTopics = [];

      for (const doc of snapshot.docs) {
        const topicData = doc.data();
        const topicId = doc.id;

        // Check if subtopics exist
        const subtopicsCollectionRef = collection(
          db,
          "courses",
          courseId,
          "topics",
          topicId,
          "subtopics"
        );
        const subtopicsSnapshot = await getDocs(subtopicsCollectionRef);

        fetchedTopics.push({
          id: topicId,
          ...topicData,
          createdAt: topicData.createdAt?.toDate?.() || null,
          hasSubtopics: !subtopicsSnapshot.empty,
        });
      }

      const sortedTopics = fetchedTopics.sort((a, b) => {
        if (!a.createdAt && !b.createdAt) return 0;
        if (!a.createdAt) return -1;
        if (!b.createdAt) return 1;
        return a.createdAt.getTime() - b.createdAt.getTime();
      });

      setTopics(sortedTopics);
    });

    return () => unsubscribe();
  }, [courseId]);

  const toggleSubtopics = (topicId) => {
    setSubtopicsVisibility((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));

    if (!subtopicsData[topicId]) {
      const subtopicsCollectionRef = collection(
        db,
        "courses",
        courseId,
        "topics",
        topicId,
        "subtopics"
      );

      onSnapshot(subtopicsCollectionRef, (snapshot) => {
        const subtopicsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSubtopicsData((prev) => ({
          ...prev,
          [topicId]: subtopicsList,
        }));
      });
    }
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
                <div className="flex items-center justify-between px-4 py-2 rounded-md hover:bg-gray-700">
                  <Link
                    to={`/create-courses/edit-and-show/${courseId}/topic/${topic.id}`}
                    onClick={() => toggleSidebar()}
                    className="text-white"
                  >
                    {topic.title}
                  </Link>
                  {topic.hasSubtopics && (
                    <button
                      onClick={() => toggleSubtopics(topic.id)}
                      className="ml-2 text-white focus:outline-none"
                    >
                      {subtopicsVisibility[topic.id] ? "▾" : "▸"}
                    </button>
                  )}
                </div>

                {/* Subtopics */}
                {subtopicsVisibility[topic.id] && (
                  <div className="ml-8 mt-2 space-y-1">
                    {subtopicsData[topic.id]?.length > 0 ? (
                      subtopicsData[topic.id].map((subtopic) => (
                        <Link
                          key={subtopic.id}
                          to={`/create-courses/${courseId}/topic/${topic.id}/subtopic/${subtopic.id}`}
                          onClick={() => toggleSidebar()}
                          className="block px-4 py-1 text-sm text-gray-300 rounded hover:bg-gray-600"
                        >
                          {subtopic.title}
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 ml-2">No subtopics available</p>
                    )}
                  </div>
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

export default CreateCourseSidebar;
