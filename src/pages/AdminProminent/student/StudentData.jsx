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

const StudentData = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const location = useLocation();
  const { title, description } = location.state || {};

  console.log(title, description);
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

  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef(null); // Reference for the dropdown container

  // Load column visibility from localStorage on mount
  useEffect(() => {
    const savedVisibility = JSON.parse(
      localStorage.getItem("columnVisibility")
    );
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
            docData.createdAt = docData.createdAt.toDate().toLocaleDateString();
          }
          return { id: doc.id, ...docData };
        });

        setStudentData(data);
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

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
      const studentRef = doc(db, "internships", selectedStudent.id);
      await updateDoc(studentRef, updatedStudent);
      setStudentData((prevData) =>
        prevData.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, ...updatedStudent }
            : student
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
      setDropdownOpen(false); // Close dropdown if clicked outside
    }
  };

  // Effect to handle outside clicks
  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup on unmount or dropdown state change
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  if (loading) return <div><Loader/></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-5">
      <h2 className="text-4xl font-bold text-center">
        Student Internship Data
      </h2>

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
                  {column.charAt(0)?.toUpperCase() || "U" + column.slice(1)}
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
              {studentData.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-100">
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
                    <td className="px-4 py-2 border">
                      {student.qualification}
                    </td>
                  )}
                  {columnVisibility.internshipType && (
                    <td className="px-4 py-2 border">
                      {student.internshipType}
                    </td>
                  )}
                  {columnVisibility.mobile && (
                    <td className="px-4 py-2 border">{student.mobile}</td>
                  )}
                  {columnVisibility.createdAt && (
                    <td className="px-4 py-2 border">{student.createdAt}</td>
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
