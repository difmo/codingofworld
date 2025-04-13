import { useProfile } from "@/context/Providers/ProfileContext";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import RouteConstants from "@/constants/routeConstants/RouteConstants";

const ProfileSidebar = ({ toggleSidebar }) => {
  const { isAdmin, blogPermission, isUserLogin } = useProfile();
  const navigate = useNavigate();
  const auth = getAuth();

  const sidebarLinks = [
    { name: "Profile", path: "/profile" },
    { name: "Contributions", path: "/profile/community-section" },
    { name: "Edit Profile", path: "/profile/edit-profile" },
  ];

  if (isAdmin) {
    sidebarLinks.push({ name: "Admin Panel", path: "/admin" });
  }

  if (blogPermission) {
    sidebarLinks.push({ name: "Blog Permissions", path: RouteConstants.NAVIGATING_ROUTE.GOTO_CREATEBLOGS });
    sidebarLinks.push({ name: "Create Courses", path: RouteConstants.NAVIGATING_ROUTE.GOTO_CREATECOURSES });
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate(RouteConstants.NAVIGATING_ROUTE.GOTO_SIGNIN);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-64 h-screen p-4 flex flex-col justify-between bg-white dark:bg-[#212529]">
      {/* Top Section: Links */}
      <ul className="space-y-2">
        {sidebarLinks.map((link, idx) => (
          <li key={idx}>
            <Link
              to={link.path}
              onClick={toggleSidebar}
              className="block px-4 py-2 text-primary font-bold border dark:text-white rounded-md hover:bg-gray-700 transition duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Bottom Section: Logout */}
      {isUserLogin && (
        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 border border-primary text-red-400 rounded-md hover:bg-gray-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
