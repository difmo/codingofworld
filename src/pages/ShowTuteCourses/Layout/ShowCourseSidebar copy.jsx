// import { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { db } from "../../../firebase";
// import { collection, getDocs } from "firebase/firestore";

// const ShowCourseSidebar = ({ toggleSidebar, isSidebarOpen }) => {
//   const { courseId } = useParams();
//   const [topics, setTopics] = useState([]);

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const topicsCollectionRef = collection(db, "courses", courseId, "topics");
//         const topicSnapshot = await getDocs(topicsCollectionRef);

//         const topicsList = topicSnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             ...data,
//             createdAt: data.createdAt?.toDate?.() || null, // convert if possible
//           };
//         });

//         const sortedTopics = topicsList.sort((a, b) => {
//           if (!a.createdAt && !b.createdAt) return 0;
//           if (!a.createdAt) return -1;
//           if (!b.createdAt) return 1;
//           return a.createdAt - b.createdAt;
//         });

//         setTopics(sortedTopics);
//       } catch (error) {
//         console.error("Error fetching topics:", error);
//       }
//     };

//     if (courseId) {
//       fetchTopics();
//     }
//   }, [courseId]);

//   return (
//     <div
//       className={`inset-y-0 left-0 w-64 h-screen space-y-6 text-primary bg-secondaryblue dark:bg-gray-900 overflow-y-auto scrollbar-hide transition-transform duration-300 ease-in-out transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } md:translate-x-0 md:static md:w-64`}
//     >
//       <ul>
//         <li>
//           <h3 className="text-lg bg-primary rounded-xl text-white text-center font-semibold transition-all duration-300 ease-in-out">
//             Course Topics
//           </h3>
//           <div className="p-4">
//             {topics.length > 0 ? (
//               topics.map((topic) => (
//                 <div key={topic.id}>
//                   <Link
//                     to={`show-courses/${courseId}/topic/${topic.id}`}
//                     onClick={toggleSidebar}
//                     className="block hover:bg-primary/30 px-2 text-white rounded-md transition-all duration-300 ease-in-out"
//                   >
//                     <span>
//                       {topic.title.split(" ").map((word, index) => (
//                         <span
//                           key={index}
//                           className={word.toLowerCase().startsWith("day") ? "text-red-500" : ""}
//                         >
//                           {word}{" "}
//                         </span>
//                       ))}
//                     </span>
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-400 dark:text-gray-600">No topics available</p>
//             )}
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default ShowCourseSidebar;
