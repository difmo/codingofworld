import React, { useState, useEffect } from "react";
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

        // Sort the topics by the day number extracted from the title in descending order
        const sortedTopics = topicsList.sort((a, b) => {
          // Extract day numbers from the titles using regex
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
    <div className=" h-screen  w-[340px] p-4 space-y-6 text-primary bg-secondaryblue m-1 rounded-xl border ">

      <ul className="space-y-4">
        <li className="">
          <h3 className="text-lg bg-primary  rounded-xl text-white text-center font-semibold">Course Topics</h3>
          <div className="p-4">
            {topics.length > 0 ? (
              topics.map((topic) => (
                <div key={topic.id}>
                  <Link
                    to={`/showcourse/${courseId}/topic/${topic.id}`}
                    onClick={() => toggleSidebar()}
                    className="block hover:bg-primary/30 px-1 text-white rounded-md"
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
              <p className="text-sm text-gray-400">No topics available</p>
            )}

          </div>

        </li>
      </ul>
    </div>
  );
};

export default ShowCourseSidebar;
