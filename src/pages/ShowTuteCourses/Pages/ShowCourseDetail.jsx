import React, { useState, useEffect } from "react";
import { db, auth } from "../../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "../../../components/Loader";
import ShowAllCoursesPage from "./ShowAllCoursesPage";
import FormattedContent from "@/Utils/FormattedContent";

const ShowCourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseDocRef = doc(db, "tutorial-courses", courseId);
        const courseDoc = await getDoc(courseDocRef);

        if (courseDoc.exists()) {
          const courseData = courseDoc.data();
          setCourse(courseData);
          setTitle(courseData.title);
          setContent(courseData.content);

          // Fetch topics for the course
          const topicsCollectionRef = collection(
            db,
            "tutorial-courses",
            courseId,
            "topics"
          );
          const topicsSnapshot = await getDocs(topicsCollectionRef);
          const topicsList = topicsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTopics(topicsList);
        } else {
          console.log("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEditToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    if (user && user.uid === course.userId) {
      try {
        const courseDocRef = doc(db, "tutorial-courses", courseId);
        await updateDoc(courseDocRef, { title, content });
        alert("Course updated successfully!");
        setIsEditMode(false);
      } catch (error) {
        console.error("Error updating course:", error);
        alert("Error updating course!");
      }
    } else {
      alert("You are not authorized to edit this course");
    }
  };

  const handleAddTopic = async () => {
    navigate(`showcourse/${courseId}`);
  };

  if (!course) {
    return <div className="text-center text-xl text-gray-600 dark:text-gray-300"><Loader /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-0 dark:bg-gray-900 dark:text-white transition-all duration-300 ease-in-out">
      {/* Header */}

      {/* Course Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg  space-y-6 transition-all duration-300 ease-in-out">
        {/* Title Input */}
        <div>
          {isEditMode ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 ease-in-out"
            />
          ) : (
            <h3 className="md:text-5xl  text-2xl font-semibold text-primary mt-2 transition-all duration-300 ease-in-out">
              {course.title}
            </h3>
          )}
        </div>

        {/* Content Area */}
        <div>
          {isEditMode ? (
            <RichTextEditor value={content} onChange={setContent} placeholder="Write your course content here..." />

          ) : (
            <FormattedContent html={course.content} />



          )}
        </div>

      </div>
    </div>
  );
};

export default ShowCourseDetails;
