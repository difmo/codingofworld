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
    <div className=" h-screen w-[340px] p-4 space-y-6 text-primary bg-secondaryblue m-1 rounded-xl border ">

      <ul className="space-y-4">
        <li className="">
          <h3 className="text-lg bg-primary  rounded-xl text-white text-center font-semibold">Course Topics</h3>
          <div className="p-4">
            {topics.length > 0 ? (
              topics.map((topic) => (
                <div key={topic.id} >
                  <Link
                    to={`/showcourse/${courseId}/topic/${topic.id}`}
                    onClick={() => toggleSidebar()}
                    className="block  hover:bg-primary/30 px-1  text-white
                   rounded-md "
                  >
                    {topic.title}
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No topics available</p>
            )}</div>

        </li>
      </ul>
    </div>
  );
};

export default ShowCourseSidebar;
