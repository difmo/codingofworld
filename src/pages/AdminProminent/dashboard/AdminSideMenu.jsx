import React, { useState } from "react";
import AdminDashboard from "../MenuPages/AdminDashboard";
import AllItemsPage from "../MenuPages/AllItemsPage";
import AdminAllOrders from "../MenuPages/AdminAllOrders";
import { AiOutlineDashboard, AiOutlineAppstoreAdd, AiOutlineShoppingCart } from "react-icons/ai"; // Import icons

const AdminSideMenu = () => {
  const [currentView, setCurrentView] = useState("AdminDashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case "Dashboard":
        return <AdminDashboard />;
      case "Orders":
        return <AdminAllOrders />;
      case "Items":
        return <AllItemsPage />;
      default:
        return <AdminDashboard />;
    }
  };

  const handleMenuClick = (view) => {
    setCurrentView(view);
    if (window.innerWidth < 1024) {  // Close sidebar on mobile/tablet after selecting a menu
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block sticky top-0 w-64 h-full p-5 overflow-y-auto bg-white shadow-lg transition-transform duration-300 ease-in-out transform right-0 z-40`}
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Admin Menu</h2>
        <ul className="p-0 list-none">
          {/* Menu items with icons */}
          <li
            key="Dashboard"
            className="flex items-center px-4 py-3 mb-2 text-gray-700 transition duration-200 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
            onClick={() => handleMenuClick("Dashboard")}
          >
            <AiOutlineDashboard size={20} className="mr-3" />
            Dashboard
          </li>
          <li
            key="Items"
            className="flex items-center px-4 py-3 mb-2 text-gray-700 transition duration-200 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
            onClick={() => handleMenuClick("Items")}
          >
            <AiOutlineAppstoreAdd size={20} className="mr-3" />
            Items
          </li>
          <li
            key="Orders"
            className="flex items-center px-4 py-3 mb-2 text-gray-700 transition duration-200 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
            onClick={() => handleMenuClick("Orders")}
          >
            <AiOutlineShoppingCart size={20} className="mr-3" />
            Orders
          </li>
        </ul>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="absolute z-50 p-2 text-white bg-blue-500 rounded-md lg:hidden top-5 right-5"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="text-xl">&#9776;</span> {/* Hamburger Icon */}
      </button>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminSideMenu;
