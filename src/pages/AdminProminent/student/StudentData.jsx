import React, { useState, useEffect, useRef } from "react";
import { FaPencilAlt, FaTrashAlt, FaFilter } from "react-icons/fa";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import Modal from "./Model";
import { useLocation } from "react-router-dom";
import Loader from "@/components/Loader";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StudentData = () => {
  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterType, setFilterType] = useState("all"); // all, today, tomorrow
  const location = useLocation();
  const { title, description } = location.state || {};

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    email: true,
    college: true,
    qualification: true,
    internshipType: true,
    mobile: true,
    createdAt: true,
    resumeURL: true,
    actions: true,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load column visibility and fetch data
  useEffect(() => {
    const savedVisibility = JSON.parse(localStorage.getItem("columnVisibility"));
    if (savedVisibility) {
      setColumnVisibility(savedVisibility);
    }

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "allinternships", title, "internships")
        );
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          if (docData.createdAt) {
            docData.createdAt = docData.createdAt.toDate();
            docData.createdAtString = docData.createdAt.toLocaleDateString();
          }
          return { id: doc.id, ...docData };
        });

        // Sort data by createdAt in descending order (newest first)
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setStudentData(sortedData);
        setFilteredData(sortedData); // Initialize filtered data
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  // Filter and sort students based on selection
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let filtered;
    if (filterType === "today") {
      filtered = studentData.filter((student) => {
        const createdAt = new Date(student.createdAt);
        return (
          createdAt.getDate() === today.getDate() &&
          createdAt.getMonth() === today.getMonth() &&
          createdAt.getFullYear() === today.getFullYear()
        );
      });
    } else if (filterType === "tomorrow") {
      filtered = studentData.filter((student) => {
        const createdAt = new Date(student.createdAt);
        return (
          createdAt.getDate() === tomorrow.getDate() &&
          createdAt.getMonth() === tomorrow.getMonth() &&
          createdAt.getFullYear() === tomorrow.getFullYear()
        );
      });
    } else {
      filtered = [...studentData];
    }

    // Sort filtered data by createdAt in descending order (newest first)
    const sortedFiltered = filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredData(sortedFiltered);
  }, [filterType, studentData]);

  // Calculate counts
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const newestDate = studentData.length
    ? Math.max(...studentData.map((s) => new Date(s.createdAt).getTime()))
    : today.getTime();

  const totalStudents = studentData.length;
  const todayStudents = studentData.filter((student) => {
    const createdAt = new Date(student.createdAt);
    return (
      createdAt.getDate() === today.getDate() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    );
  }).length;
  const tomorrowStudents = studentData.filter((student) => {
    const createdAt = new Date(student.createdAt);
    return (
      createdAt.getDate() === tomorrow.getDate() &&
      createdAt.getMonth() === tomorrow.getMonth() &&
      createdAt.getFullYear() === tomorrow.getFullYear()
    );
  }).length;

  // Chart data
  const chartData = {
    labels: ["Total Students", "Today", "Tomorrow"],
    datasets: [
      {
        data: [totalStudents, todayStudents, tomorrowStudents],
        backgroundColor: ["#36A2EB", "#4CAF50", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#4CAF50", "#FFCE56"],
      },
    ],
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "allinternships", title, "internships", id));
      setStudentData((prevData) =>
        prevData.filter((student) => student.id !== id)
      );
    } catch (err) {
      setError("Error deleting data: " + err.message);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const handleEditSubmit = async (updatedStudent) => {
    try {
      const studentRef = doc(db, "allinternships", title, "internships", selectedStudent.id);
      await updateDoc(studentRef, updatedStudent);
      setStudentData((prevData) =>
        prevData.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, ...updatedStudent }
            : student
        ).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
      handleCloseModal();
    } catch (err) {
      setError("Error updating data: " + err.message);
    }
  };

  // Toggle column visibility
  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prevVisibility) => {
      const newVisibility = {
        ...prevVisibility,
        [column]: !prevVisibility[column],
      };
      localStorage.setItem("columnVisibility", JSON.stringify(newVisibility));
      return newVisibility;
    });
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  if (loading) return <div><Loader /></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-5">
      <h2 className="text-4xl font-bold text-center">
        Student Internship Data
      </h2>

      {/* Student Counts and Filters */}
      <div className="my-4 flex justify-center gap-4">
        <button
          onClick={() => setFilterType("all")}
          className={`px-4 py-2 rounded-md ${filterType === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Total Students: {totalStudents}
        </button>
        <button
          onClick={() => setFilterType("today")}
          className={`px-4 py-2 rounded-md ${filterType === "today" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Today: {todayStudents}
        </button>
        <button
          onClick={() => setFilterType("tomorrow")}
          className={`px-4 py-2 rounded-md ${filterType === "tomorrow" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Tomorrow: {tomorrowStudents}
        </button>
      </div>

      {/* Pie Chart */}
      <div className="my-4 flex justify-center">
        <div className="w-64 h-64">
          <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>

      {/* Dropdown for Column Visibility */}
      <div className="relative inline-block py-3 text-left" ref={dropdownRef}>
        <button
          type="button"
          className="inline-flex items-center justify-center text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={handleDropdownToggle}
        >
          <FaFilter className="w-5 h-5 mr-2" />
          <span>Filter Columns</span>
        </button>
        {dropdownOpen && (
          <div className="absolute w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg -right-20 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {Object.keys(columnVisibility).map((column) => (
                <label key={column} className="block px-4 py-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={columnVisibility[column]}
                    onChange={() => toggleColumnVisibility(column)}
                    className="mr-2"
                  />
                  {column.charAt(0)?.toUpperCase() + column.slice(1)}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center min-h-screen py-5">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full border border-collapse border-gray-300">
            <thead className="text-white bg-green-600">
              <tr>
                {columnVisibility.name && (
                  <th className="w-10 px-4 py-2 border">Sr No.</th>
                )}
                {columnVisibility.name && (
                  <th className="w-48 px-4 py-2 border">Student Name</th>
                )}
                {columnVisibility.email && (
                  <th className="w-48 px-4 py-2 border">Email</th>
                )}
                {columnVisibility.college && (
                  <th className="w-48 px-4 py-2 border">College</th>
                )}
                {columnVisibility.qualification && (
                  <th className="w-48 px-4 py-2 border">Qualification</th>
                )}
                {columnVisibility.internshipType && (
                  <th className="w-48 px-4 py-2 border">Internship Type</th>
                )}
                {columnVisibility.mobile && (
                  <th className="w-48 px-4 py-2 border">Mobile</th>
                )}
                {columnVisibility.createdAt && (
                  <th className="w-48 px-4 py-2 border">Date</th>
                )}
                {columnVisibility.resumeURL && (
                  <th className="w-48 px-4 py-2 border">Resume URL</th>
                )}
                {columnVisibility.actions && (
                  <th className="w-20 px-4 py-2 border">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student, index) => (
                <tr
                  key={student.id}
                  className={
                    new Date(student.createdAt).getTime() === newestDate
                      ? "bg-green-100 hover:bg-green-200"
                      : "hover:bg-gray-100"
                  }
                >
                  {columnVisibility.name && (
                    <td className="px-4 py-2 border">{index + 1}</td>
                  )}
                  {columnVisibility.name && (
                    <td className="px-4 py-2 border">{student.name}</td>
                  )}
                  {columnVisibility.email && (
                    <td className="px-4 py-2 border">{student.email}</td>
                  )}
                  {columnVisibility.college && (
                    <td className="px-4 py-2 border">{student.college}</td>
                  )}
                  {columnVisibility.qualification && (
                    <td className="px-4 py-2 border">{student.qualification}</td>
                  )}
                  {columnVisibility.internshipType && (
                    <td className="px-4 py-2 border">{student.internshipType}</td>
                  )}
                  {columnVisibility.mobile && (
                    <td className="px-4 py-2 border">{student.mobile}</td>
                  )}
                  {columnVisibility.createdAt && (
                    <td className="px-4 py-2 border">{student.createdAtString}</td>
                  )}
                  {columnVisibility.resumeURL && (
                    <td className="px-4 py-2 border">
                      <a
                        href={student.resumeURL}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resume
                      </a>
                    </td>
                  )}
                  {columnVisibility.actions && (
                    <td className="flex px-4 py-2 border justify-evenly">
                      <button
                        onClick={() => handleEdit(student)}
                        className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        <FaPencilAlt className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        <FaTrashAlt className="w-5 h-5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Editing */}
      <Modal showModal={showModal} closeModal={handleCloseModal}>
        {selectedStudent && (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedStudent = {
                  name: e.target.name.value,
                  email: e.target.email.value,
                  college: e.target.college.value,
                  qualification: e.target.qualification.value,
                  internshipType: e.target.internshipType.value,
                  mobile: e.target.mobile.value,
                };
                handleEditSubmit(updatedStudent);
              }}
            >
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedStudent.name}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedStudent.email}
                  required
                />
              </div>
              <div>
                <label>College:</label>
                <input
                  type="text"
                  name="college"
                  defaultValue={selectedStudent.college}
                />
              </div>
              <div>
                <label>Qualification:</label>
                <input
                  type="text"
                  name="qualification"
                  defaultValue={selectedStudent.qualification}
                />
              </div>
              <div>
                <label>Internship Type:</label>
                <input
                  type="text"
                  name="internshipType"
                  defaultValue={selectedStudent.internshipType}
                />
              </div>
              <div>
                <label>Mobile:</label>
                <input
                  type="text"
                  name="mobile"
                  defaultValue={selectedStudent.mobile}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
              >
                Update Student
              </button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentData;