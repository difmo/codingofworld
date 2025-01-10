import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';  // Ensure Firebase is correctly set up
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Using React Router for navigation
import { Bar } from 'react-chartjs-2'; // Importing Bar chart from Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
        // Sort students by createdAt in descending order
        studentsList.sort((a, b) => b.createdAt - a.createdAt);
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

  // Calculate the total number of students
  const totalStudents = students.length;

  // Get the top 3 students by marks
  const topStudents = [...students].sort((a, b) => b.marks - a.marks).slice(0, 3);

  // Group students into custom mark ranges
  const markRanges = [
    { range: '1-3', students: [] },
    { range: '4-5', students: [] },
    { range: '7-9', students: [] },
    { range: '10', students: [] },
  ];

  // Categorize students into the ranges
  students.forEach(student => {
    const marks = student.marks;
    if (marks >= 1 && marks <= 3) markRanges[0].students.push(student);
    else if (marks >= 4 && marks <= 5) markRanges[1].students.push(student);
    else if (marks >= 7 && marks <= 9) markRanges[2].students.push(student);
    else if (marks === 10) markRanges[3].students.push(student);
  });

  // Extract range labels and student counts
  const markRangeLabels = markRanges.map(range => range.range);
  const markRangeCounts = markRanges.map(range => range.students.length);

  // Tooltips callback to display student names on hover
  const tooltipCallback = (tooltipItem) => {
    const rangeIndex = tooltipItem.dataIndex;
    const studentsInRange = markRanges[rangeIndex].students;
    const studentNames = studentsInRange.map(student => student.name).join(', ');
    return `Students: ${studentNames}`;
  };

  // Bar chart data
  const chartData = {
    labels: markRangeLabels,
    datasets: [{
      label: 'Number of Students by Marks Range',
      data: markRangeCounts,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  // Bar chart options with custom tooltips
  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipCallback(tooltipItem); // Custom tooltip showing student names
          },
        },
      },
    },
  };

  return (
    <div className="admin-dashboard m-8">
      <h1 className="text-xl font-bold mb-4">Test Students</h1>
      
      {/* Total number of students */}
      <div className="mb-4 text-4xl  ">
        <p>Total number of students: <strong className='text-primary' >{totalStudents}</strong></p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Top 3 Students</h2>
        <ul>
          {topStudents.map((student, index) => (
            <li key={student.id} className={`my-2 ${index === 0 ? 'text-red-500' : index === 1 ? 'text-blue-500' : 'text-green-500'}`}>
              <strong>{index + 1}. {student.name}</strong> - Marks: {student.marks}
            </li>
          ))}
        </ul>
      </div>

        <div className="mb-8 w-1/2 m-5">
          <h2 className="text-lg font-semibold">Student Distribution by Marks Range</h2>
          <Bar 
            data={{
          ...chartData,
          datasets: [{
            ...chartData.datasets[0],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
          }]
            }} 
            options={chartOptions} 
          />
        </div>

        {/* Students Table */}
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
          {students.map((student, index) => (
            <tr key={student.id} className={index === 0 ? 'bg-yellow-100' : ''}>
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
