import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import {
  collection,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

const ShowCourseSidebar = ({ toggleSidebar, isSidebarOpen }) => {
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [subtopicsData, setSubtopicsData] = useState({});
  const [subtopicsVisibility, setSubtopicsVisibility] = useState({});
  const [loadingSubtopics, setLoadingSubtopics] = useState({});

  useEffect(() => {
    if (!courseId) return;

    const topicsCollectionRef = collection(db, "courses", courseId, "topics");
    setLoadingTopics(true);

    const unsubscribe = onSnapshot(topicsCollectionRef, async (snapshot) => {
      const fetchedTopics = [];

      for (const doc of snapshot.docs) {
        const topicData = doc.data();
        const topicId = doc.id;

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
      setLoadingTopics(false);
    });

    return () => unsubscribe();
  }, [courseId]);

  const toggleSubtopics = (topicId) => {
    setSubtopicsVisibility((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));

    if (!subtopicsData[topicId]) {
      setLoadingSubtopics((prev) => ({ ...prev, [topicId]: true }));

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

        setLoadingSubtopics((prev) => ({ ...prev, [topicId]: false }));
      });
    }
  };

  return (
    <div
      className={`inset-y-0 left-0 w-64 h-screen space-y-6 text-primary bg-secondaryblue dark:bg-gray-900 overflow-y-auto scrollbar-hide transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-64`}
    >
      <ul>
        <li>
          <h3 className="text-lg bg-primary rounded-xl text-white text-center font-semibold transition-all duration-300 ease-in-out">
            Course Topics
          </h3>
          <div className="p-4 space-y-2">
            {loadingTopics ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-6 bg-gray-300 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            ) : topics.length > 0 ? (
              topics.map((topic) => (
                <div key={topic.id}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`${courseId}/topic/${topic.id}`}
                      onClick={toggleSidebar}
                      className="block hover:bg-primary/30 px-2 text-white rounded-md transition-all duration-300 ease-in-out w-full"
                    >
                      <span>
                        {topic.title.split(" ").map((word, index) => (
                          <span
                            key={index}
                            className={
                              word.toLowerCase().startsWith("day")
                                ? "text-red-500"
                                : ""
                            }
                          >
                            {word}{" "}
                          </span>
                        ))}
                      </span>
                    </Link>

                    {topic.hasSubtopics && (
                      <button
                        onClick={() => toggleSubtopics(topic.id)}
                        className="text-white ml-1"
                      >
                        {subtopicsVisibility[topic.id] ? "▾" : "▸"}
                      </button>
                    )}
                  </div>

                  {subtopicsVisibility[topic.id] && (
                    <div className="ml-4 mt-1 space-y-1">
                      {loadingSubtopics[topic.id] ? (
                        <div className="space-y-2 animate-pulse">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-3/4"
                            ></div>
                          ))}
                        </div>
                      ) : subtopicsData[topic.id]?.length > 0 ? (
                        subtopicsData[topic.id].map((subtopic) => (
                          <Link
                            key={subtopic.id}
                            to={`${courseId}/topic/${topic.id}/subtopic/${subtopic.id}`}
                            onClick={toggleSidebar}
                            className="block text-sm text-white hover:bg-primary/20 px-2 py-1 rounded"
                          >
                            {subtopic.title}
                          </Link>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400 ml-2">
                          No subtopics
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-600">
                No topics available
              </p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ShowCourseSidebar;
