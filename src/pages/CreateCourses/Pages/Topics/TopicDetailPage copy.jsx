import React, { useState, useEffect } from "react";
import { db,auth} from "../../../../firebase";
import { doc, getDocs,getDoc, updateDoc,where,collection,query,serverTimestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS for styling

const TopicDetailPage = () => {
  const [topic, setTopic] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Toggle between edit and show mode
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const { courseId, topicId } = useParams();
  const  [admin, setIsAdmin] = useState(false); 
  const [blogPermission, setBlogPermission] = useState(false);
  const [userLogin, setIsUserLogin] = useState(false);
  const [bloggerName, setbloggerName] = useState();

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
              if (user.emailVerified) {
                  setIsUserLogin(user);
                  fetchUserRole(user.uid);
                  // setUserUid(user.uid);
              } else {
                  console.log("Email is not verified yet");
              }
          } else {
              setIsAdmin(false);
              setIsUserLogin(false);
              console.log("user is not login yet");
          }
      });
      return () => unsubscribe();
  });

  const fetchUserRole = async (uid) => {
      try {
          const userQuery = query(collection(db, "users"), where("uid", "==", uid));
          const querySnapshot = await getDocs(userQuery);
          if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                  const userData = doc.data();
                  if (userData.isCreatePermission == true) {
                      setBlogPermission(true);
                  }
                  if (userData.name) {
                      setbloggerName(userData.name);
                      console.log(userData.name);
                  }
                  // sdfdsf
                  if (userData.whoIs == "isAdmin") {
                      setIsAdmin(true);
                  } else {
                      setIsAdmin(false);
                  }
              });
          } else {
              console.log("No user found with uid");
          }
      } catch (e) {
          console.log(e);
      }
  };


  // Fetch topic details from Firebase
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const topicDocRef = doc(db, 'courses', courseId, 'topics', topicId);
        const topicDoc = await getDoc(topicDocRef);

        if (topicDoc.exists()) {
          const topicData = topicDoc.data();
          setTopic(topicData);
          setNewTitle(topicData.title);
          setNewContent(topicData.content);
        } else {
          console.log('Topic not found');
        }
      } catch (error) {
        console.error('Error fetching topic:', error);
      }
    };

    fetchTopic();
  }, [courseId, topicId]);

  // Toggle between show mode and edit mode
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  // Handle saving the edited topic
  const handleSave = async () => {
    try {
      const topicDocRef = doc(db, 'courses', courseId, 'topics', topicId);
      await updateDoc(topicDocRef, {
        title: newTitle,
        content: newContent,
        createdAt: serverTimestamp(),  // Add createdAt field with server timestamp

      });
      alert('Topic updated successfully!');
      setIsEditMode(false); // Switch back to show mode after saving
    } catch (error) {
      console.error('Error updating topic:', error);
      alert('Error updating topic!');
    }
  };

  if (!topic) {
    return <div className="text-center text-xl text-gray-600"><Loader/></div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* <h2 className="text-3xl font-semibold">{isEditMode ? "Edit Topic" : topic.title}</h2> */}
      
      <div className="mt-4">
        {/* Title Input */}
        {isEditMode ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <h3 className="text-2xl font-semibold">{topic.title}</h3>
        )}
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {isEditMode ? (
          <ReactQuill
            value={newContent}
            onChange={setNewContent}
            className="w-full"
            placeholder="Write the content of the topic here"
          />
        ) : (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: topic.content }}
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-6">
       { blogPermission ? <button
          onClick={toggleEditMode}
          className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEditMode ? "Cancel Edit" : "Edit Topic"}
        </button> : null}

        {isEditMode && (
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default TopicDetailPage;
