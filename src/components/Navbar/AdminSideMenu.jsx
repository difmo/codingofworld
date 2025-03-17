import React from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen p-4 space-y-6 text-white border-r bg-[#ffffff]">
      <div className="flex flex-col w-full p-2 border rounded-lg">
        <img src={logo} className="h-20" alt="logo" />
      </div>

      <ul className="space-y-4">
        <li
          onClick={() => {
            navigate("/admin-dashboard");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          Dashboard
        </li>
        <li
          onClick={() => {
            navigate("/admin/internship");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          Interns
        </li>
        <li
          onClick={() => {
            navigate("/admin/client-contact");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          Contact
        </li>
        <li
          onClick={() => {
            navigate("/admin/login-users");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          Login Users
        </li>
        <li
          onClick={() => {
            navigate("/admin/blog");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          Blogs
        </li>
        <li
          onClick={() => {
            navigate("./admin/createNewInternship");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          Create New Internship
        </li>
        <li
          onClick={() => {
            navigate("./admin/allInternship");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          All Internship
        </li>
        <li
          onClick={() => {
            navigate("/admin/createnewcourse");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          Create New Course
        </li>
        <li
          onClick={() => {
            navigate("/admin/allcoures ");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          All Course
        </li>
        <li
          onClick={() => {
            navigate("/admin/admin-student-test");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          Student Test
        </li>
        <li
          onClick={() => {
            navigate("/admin/student/plan");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-3 mb-2 text-white transition duration-200 rounded-lg cursor-pointer bg-primary hover:bg-blue-600"
        >
          Plan
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
