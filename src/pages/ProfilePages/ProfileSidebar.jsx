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
  }
  if (blogPermission) {
    sidebarLinks.push({ name: "create-coureses", path: RouteConstants.NAVIGATING_ROUTE.GOTO_CREATECOURSES });
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
    <div className="w-64 h-screen p-4 space-y-6 text-white bg-[#212529]">
      <ul className="space-y-2">
        {sidebarLinks.map((link, idx) => (
          <li key={idx}>
            <Link
              to={link.path}
              onClick={toggleSidebar}
              className="block px-4 py-2 text-white rounded-md hover:bg-gray-700 transition duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
        {isUserLogin && (
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-400 rounded-md hover:bg-gray-700 transition duration-200"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
