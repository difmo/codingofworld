import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';  // Ensure Firebase is correctly set up
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Using React Router for navigation

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  
  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsRef = collection(db, "students");
        const snapshot = await getDocs(studentsRef);
        const studentsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentsList);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);
  
  // Handle delete student
  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        const studentRef = doc(db, "students", studentId);
        await deleteDoc(studentRef);  // Delete the student document from Firestore
        setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId));  // Remove from UI
        alert("Student deleted successfully.");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Error deleting student. Please try again.");
      }
    }
  };

  return (
    <div className="admin-dashboard m-8">
      <h1 className="text-xl font-bold mb-4">Test Students</h1>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Marks</th>
            <th className="border p-2">Stream</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">{student.marks}</td>
              <td className="border p-2">{student.stream}</td>
              <td className="border p-2">
                <Link to={`/admin/student/${student.id}`} className="text-blue-500 hover:underline mr-2">
                  View
                </Link>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
