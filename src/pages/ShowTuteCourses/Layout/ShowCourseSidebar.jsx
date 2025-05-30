import { useState, useEffect, useMemo, memo } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

// Memoized TopicItem component
const TopicItem = memo(({ topic, courseId, toggleSidebar, toggleSubtopics, subtopicsVisibility, subtopicsData, loadingSubtopics }) => {
  return (
    <div key={topic.id}>
      <div className="flex items-center justify-between">
        <Link
          to={`${courseId}/topic/${topic.id}`}
          onClick={toggleSidebar}
          className="block hover:bg-primary/30 px-2 py-1 text-white rounded-md transition-all duration-300 ease-in-out w-full"
        >
          <span>
            {topic.title.split(" ").map((word, index) => (
              <span
                key={index}
                className={word.toLowerCase().startsWith("day") ? "text-red-500" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </span>
        </Link>

        {topic.hasSubtopics && (
          <button
            onClick={() => toggleSubtopics(topic.id)}
            className="text-white ml-1 focus:outline-none"
            aria-expanded={subtopicsVisibility[topic.id]}
            aria-controls={`subtopics-${topic.id}`}
          >
            {subtopicsVisibility[topic.id] ? "▾" : "▸"}
          </button>
        )}
      </div>

      {subtopicsVisibility[topic.id] && (
        <div className="ml-4 mt-1 space-y-1" id={`subtopics-${topic.id}`}>
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
            <p className="text-xs text-gray-400 ml-2">No subtopics</p>
          )}
        </div>
      )}
    </div>
  );
});

const ShowCourseSidebar = ({ toggleSidebar, isSidebarOpen }) => {
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [subtopicsData, setSubtopicsData] = useState({});
  const [subtopicsVisibility, setSubtopicsVisibility] = useState({});
  const [loadingSubtopics, setLoadingSubtopics] = useState({});

  useEffect(() => {
    if (!courseId) return;

    const fetchData = async () => {
      setLoadingTopics(true);
      try {
        // Fetch topics
        const topicsCollectionRef = collection(db, "courses", courseId, "topics");
        const topicsSnapshot = await getDocs(topicsCollectionRef);
        
        // Batch fetch subtopics for all topics
        const fetchedTopics = [];
        const subtopicsPromises = [];

        for (const doc of topicsSnapshot.docs) {
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
          
          fetchedTopics.push({
            id: topicId,
            ...topicData,
            createdAt: topicData.createdAt?.toDate?.() || null,
            hasSubtopics: false,
          });

          // Queue subtopics fetch
          subtopicsPromises.push(
            getDocs(subtopicsCollectionRef).then((subtopicsSnapshot) => ({
              topicId,
              hasSubtopics: !subtopicsSnapshot.empty,
              subtopics: subtopicsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
            }))
          );
        }

        // Resolve all subtopics fetches
        const subtopicsResults = await Promise.all(subtopicsPromises);
        
        // Update topics with hasSubtopics and store subtopics
        const updatedTopics = fetchedTopics.map((topic) => {
          const subtopicResult = subtopicsResults.find((res) => res.topicId === topic.id);
          if (subtopicResult) {
            setSubtopicsData((prev) => ({
              ...prev,
              [topic.id]: subtopicResult.subtopics,
            }));
            return { ...topic, hasSubtopics: subtopicResult.hasSubtopics };
          }
          return topic;
        });

        // Sort topics by createdAt
        const sortedTopics = updatedTopics.sort((a, b) => {
          if (!a.createdAt && !b.createdAt) return 0;
          if (!a.createdAt) return -1;
          if (!b.createdAt) return 1;
          return a.createdAt.getTime() - b.createdAt.getTime();
        });

        setTopics(sortedTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchData();
  }, [courseId]);

  const toggleSubtopics = (topicId) => {
    setSubtopicsVisibility((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  // Memoize topics list
  const topicsList = useMemo(() => {
    return topics.map((topic) => (
      <TopicItem
        key={topic.id}
        topic={topic}
        courseId={courseId}
        toggleSidebar={toggleSidebar}
        toggleSubtopics={toggleSubtopics}
        subtopicsVisibility={subtopicsVisibility}
        subtopicsData={subtopicsData}
        loadingSubtopics={loadingSubtopics}
      />
    ));
  }, [topics, courseId, toggleSidebar, subtopicsVisibility, subtopicsData, loadingSubtopics]);

  return (
   <div
  className={` fixed md:sticky   left-0 w-64 h-screen space-y-6 text-primary bg-secondaryblue dark:bg-gray-900 overflow-y-auto scrollbar-hide md:w-72 transition-transform duration-300 ease-in-out ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:translate-x-0 z-50`}
  aria-hidden={!isSidebarOpen}
  role="navigation"
  aria-label="Sidebar Navigation"
>
      <ul>
        <li>
          <h3 className="text-lg bg-primary rounded-xl text-white text-center font-semibold m-2 transition-all duration-300 ease-in-out">
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
              topicsList
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