import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase"; // Adjust this path if needed

const StudentData = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch internship data from Firestore
    const fetchData = async () => {
      try {
        // Get documents from 'internships' collection
        const querySnapshot = await getDocs(collection(db, 'internships'));
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          
          // Convert Firestore timestamp (createdAt) to a readable date string
          if (docData.createdAt) {
            // Convert Firestore timestamp to Date object, then to a human-readable string
            docData.createdAt = docData.createdAt.toDate().toLocaleDateString();
          }
          
          return docData; // Return transformed document data
        });
        
        // Store the fetched data in state
        setStudentData(data);
      } catch (err) {
        // Handle any errors that occur during data fetching
        setError('Error fetching data: ' + err.message);
      } finally {
        // Set loading to false once data has been fetched or if an error occurs
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array means this will only run once (on component mount)

  if (loading) {
    return <div className="text-xl font-semibold text-center">Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error message if there's an issue with data fetching
  }

  return (
    <div className="container p-6 mx-auto rounded-lg shadow-lg bg-gray-50">
      <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Student Internship Data</h2>
      
      {/* Wrapping the table in flex container to center it */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="min-w-full border border-collapse border-gray-300 rounded-lg table-auto">
            <thead>
              <tr className="text-white bg-green-500">
                <th className="px-4 py-3 text-left border border-gray-300">Student Name</th>
                <th className="px-4 py-3 text-left border border-gray-300">Email</th>
                <th className="px-4 py-3 text-left border border-gray-300">Internship Type</th>
                <th className="px-4 py-3 text-left border border-gray-300">Mobile</th>
                <th className="px-4 py-3 text-left border border-gray-300">Date</th>
                <th className="px-4 py-3 text-left border border-gray-300">Resume URL</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border border-gray-200">{student.name}</td>
                  <td className="px-4 py-3 border border-gray-200">{student.email}</td>
                  <td className="px-4 py-3 border border-gray-200">{student.internshipType}</td>
                  <td className="px-4 py-3 border border-gray-200">{student.mobile}</td>
                  <td className="px-4 py-3 border border-gray-200">{student.createdAt}</td> {/* Displaying the formatted date */}
                  <td className="px-4 py-3 border border-gray-200">
                    <a href={student.resumeURL} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Resume</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentData;
