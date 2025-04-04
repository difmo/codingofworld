import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db, auth } from "../../../firebase";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateNewCourse = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        console.log("user uid pritam" + user.uid);
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setEmail(userDoc.data().email);
            setName(userDoc.data().name);
          } else {
            console.error("No such user document!");
            setErrorMessage("User data not found.");
          }
        } else {
          console.error("No user is signed in.");
          setErrorMessage("No user is signed in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a course!");
      return;
    }

    try {
      const courseId = uuidv4();
      const courseData = {
        title,
        content,
        userId: user.uid,
        userName: name,
        userEmail: email,
        createdAt: new Date(),
        isPublished: false,
      };

      const courseRef = doc(collection(db, "courses"), courseId);
      await setDoc(courseRef, courseData);

      alert("Course created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error creating course!");
    }
  };

  return (
    <div className="create-course-container">
      <h2>Create New Course</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <ReactQuill
            id="content"
            value={content}
            onChange={setContent}
            className="w-full"
            placeholder="Write the content of your course"
            modules={{
              toolbar: [
                [
                  { header: "1" },
                  { header: "2" },
                  { header: "3" },
                  { header: "4" },
                  { header: "5" },
                  { header: "6" },
                ],
                [{ font: [] }],
                [{ size: ["small", "normal", "large", "huge"] }], //

                ["bold", "italic", "underline"],
                ["link"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                ["image"],
                ["clean"],
              ],
            }}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewCourse;
