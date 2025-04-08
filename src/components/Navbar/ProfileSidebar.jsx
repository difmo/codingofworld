import React from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // Define sidebar navigation data inside the same file
  const sidebarData = [
    { label: "Dashboard", path: "/admin" },
    { label: "Interns", path: "/admin/internship" },
    { label: "CreateNewInternship", path: "/admin/create-new-intership" },
    { label: "Placement Stats", path: "/admin/create-stats" },
    { label: "Contact", path: "/admin/client-contact" },
    { label: "Login Users", path: "/admin/login-users" },
    { label: "Blogs", path: "/admin/blogs" },
    { label: "Course", path: "/admin/admin-course" },
    { label: "All Internship", path: "/admin/allInternship" },
    // { label: "Create New Course", path: "/admin/createnewcourse" },
    { label: "All Course", path: "/admin/all-courses" },
    { label: "Student Test", path: "admin/admin-student-test" },
    { label: "Plan", path: "/admin/student/plan" },
    { label: "Create Banners", path: "/admin/create-banner" },
    { label: "Create Programs", path: "/admin/create-home-programs" },
  ];

  return (
    <div className="w-64 h-screen p-4 space-y-6 text-black border-r bg-[#ffffff]">
      <div className="flex flex-col w-full p-2 border rounded-lg">
        <img src={logo} className="h-20" alt="logo" />
      </div>

      <ul className="space-y-0">
        {sidebarData.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              navigate(item.path); // Use the path from the sidebarData
              // toggleSidebar();
            }}
            className="flex items-center px-4 py-1 mb-2 text-black transition duration-200 rounded-lg cursor-pointer hover:text-white hover:bg-primary"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
