import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase"; 

const StudentData = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'internships'));
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          
          if (docData.createdAt) {
            docData.createdAt = docData.createdAt.toDate().toLocaleDateString();
          }
          
          return docData; 
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
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue with data fetching
  }

  return (
    <>
    <div className='text-center'>
    <h2>Student Internship Data</h2>
    </div>
    <div className='flex justify-center min-h-screen py-5'>
      <div className='w-full overflow-x-auto'>
        <table className='min-w-full border border-collapse border-gray-300'>
          <thead className='text-white bg-green-600'>
            <tr>

              <th className='px-4 py-2 border'>Sr No.</th>
              <th className='px-4 py-2 border'>Student Name</th>
              <th className='px-4 py-2 border'>Email</th>
              <th className='px-4 py-2 border'>College</th>
              <th className='px-4 py-2 border'>Qualification</th>
              <th className='px-4 py-2 border'>Internship Type</th>
              <th className='px-4 py-2 border'>Mobile</th>
              <th className='px-4 py-2 border'>Date</th>
              <th className='px-4 py-2 border'>Resume URL</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => (
              <tr key={index} className='hover:bg-gray-100'>
                <td className='px-4 py-2 border'>{index+1}</td>
                <td className='px-4 py-2 border'>{student.name}</td>
                <td className='px-4 py-2 border'>{student.email}</td>
                <td className='px-4 py-2 border'>{student.college}</td>
                <td className='px-4 py-2 border'>{student.qualification}</td>
                <td className='px-4 py-2 border'>{student.internshipType}</td>
                <td className='px-4 py-2 border'>{student.mobile}</td>
                <td className='px-4 py-2 border'>{student.createdAt}</td>
                <td className='px-4 py-2 border'>
                  <a href={student.resumeURL} className='text-blue-500 hover:underline' target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </> 
  );
};

export default StudentData;
