import  { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; 
import { db } from "../../../firebase"; 
import { collection, getDocs } from "firebase/firestore";

const CreateCourseSidebar = ({ toggleSidebar }) => {
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

        setTopics(topicsList);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    if (courseId) {
      fetchTopics();
    }
  }, [courseId]);

  return (
    <div className=" w-[400px] h-screen p-4 space-y-2 text-white bg-[#212529] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col w-full p-2 border border-gray-500 rounded-lg">
        <p className="mt-2 text-xl font-bold text-center">Coding Of World</p>
      </div>

      <ul className="space-y-4">
        <li className="mt-6">
          <h3 className="text-lg font-semibold">Course Topics</h3>
          {topics.length > 0 ? (
            topics.map((topic) => (
              <div key={topic.id}>
                <Link
                  to={`/usercourse/${courseId}/topic/${topic.id}`}
                  onClick={() => toggleSidebar()}
                  className="block px-4  text-white rounded-md hover:bg-gray-700"
                >
                  {topic.title}
                </Link>
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
