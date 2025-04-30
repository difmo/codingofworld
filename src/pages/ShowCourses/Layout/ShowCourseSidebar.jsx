import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const ShowCourseSidebar = ({ toggleSidebar }) => {
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsCollectionRef = collection(db, "courses", courseId, "topics");
        const topicSnapshot = await getDocs(topicsCollectionRef);
        const topicsList = topicSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedTopics = topicsList.sort((a, b) => {
          const extractDayNumber = (title) => {
            const match = title.match(/Day (\d+)/);
            return match ? parseInt(match[1]) : -Infinity; // If no day is found, place at the end
          };

          const dayA = extractDayNumber(a.title);
          const dayB = extractDayNumber(b.title);

          return dayB - dayA; // Sort in descending order based on the day number
        });

        setTopics(sortedTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    if (courseId) {
      fetchTopics();
    }
  }, [courseId]);

  return (
    <div className="h-screen space-y-6 text-primary bg-secondaryblue dark:bg-gray-900 overflow-y-auto scrollbar-hide transition-all duration-300 ease-in-out">

      <ul className="">
        <li>
          <h3 className="text-lg bg-primary rounded-xl text-white text-center font-semibold transition-all duration-300 ease-in-out">
            Course Topics
          </h3>
          <div className="p-4">
            {topics.length > 0 ? (
              topics.map((topic) => (
                <div key={topic.id}>
                  <Link
                    to={`showcoursee/${courseId}/topic/${topic.id}`}
                    onClick={() => toggleSidebar()}
                    className="block hover:bg-primary/30 px-2 text-white rounded-md transition-all duration-300 ease-in-out"
                  >
                    <span>
                      {topic.title.split(' ').map((word, index) => (
                        <span
                          key={index}
                          className={word.toLowerCase().startsWith('day') ? 'text-red-500' : ''}
                        >
                          {word}{' '}
                        </span>
                      ))}
                    </span>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-600">No topics available</p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ShowCourseSidebar;
