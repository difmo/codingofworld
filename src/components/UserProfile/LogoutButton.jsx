import React from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User has logged out");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="mt-6 text-center block">
      <button
        onClick={handleLogout}
        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
