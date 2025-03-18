import React from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen p-4 space-y-6 text-black border-r bg-[#ffffff]">
      <div className="flex flex-col w-full p-2 border rounded-lg">
        <img src={logo} className="h-20" alt="logo" />
      </div>

      <ul className="space-y-0">
        <li
          onClick={() => {
            navigate("/admin-dashboard");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          Dashboard
        </li>
        <li
          onClick={() => {
            navigate("/admin/internship");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          Interns
        </li>
        <li
          onClick={() => {
            navigate("/admin/internship");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          Placement Stats
        </li>
        <li
          onClick={() => {
            navigate("/admin/client-contact");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          Contact
        </li>
        <li
          onClick={() => {
            navigate("/admin/login-users");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          Login Users
        </li>
        <li
          onClick={() => {
            navigate("/admin/blog");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          Blogs
        </li>
        <li
          onClick={() => {
            navigate("./admin/createNewInternship");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          Create New Internship
        </li>
        <li
          onClick={() => {
            navigate("./admin/allInternship");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          All Internship
        </li>
        <li
          onClick={() => {
            navigate("/admin/createnewcourse");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          Create New Course
        </li>
        <li
          onClick={() => {
            navigate("/admin/allcoures ");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          All Course
        </li>
        <li
          onClick={() => {
            navigate("/admin/admin-student-test");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          Student Test
        </li>
        <li
          onClick={() => {
            navigate("/admin/student/plan");
            // toggleSidebar();
          }}
          className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
        >
          Plan
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
