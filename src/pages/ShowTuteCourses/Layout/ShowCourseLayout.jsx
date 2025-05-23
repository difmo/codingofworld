import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ShowCourseSidebar from "./ShowCourseSidebar";
import ShowCourseNavbar from "./ShowCourseNavbar";

const ShowCourseLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Load AdSense script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    // Push ads to render
    (window.adsbygoogle = window.adsbygoogle || []).push({});

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="flex h-screen dark:bg-gray-900 transition-all duration-300 ease-in-out">
      {/* Sidebar */}
      <div className="fixed md:static w-72 h-full md:flex flex-col">
        <ShowCourseSidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main Content and Ads */}
      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <div className="w-full">
            <ShowCourseNavbar toggleSidebar={toggleSidebar} />
          </div>
          <div className="flex-1 p-3 md:p-8 overflow-y-auto bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out scrollbar-thin scrollbar-primary dark:scrollbar-dark">
            <Outlet />
          </div>
        </div>

        {/* Right-Side Ad Column */}
        <div className="hidden md:block w-80 p-4 bg-gray-100 dark:bg-gray-700 transition-all duration-300 ease-in-out">
          <div className="space-y-4">
            {/* Ad 1 (300x250) */}
            <div className="text-center">
            <ins
                className="adsbygoogle"
                style={{ display: "inline-block", width: "300px", height: "600px" }}
                data-ad-client="ca-pub-4765539220931071"
                data-ad-slot="3774960648"
                ></ins> 
            </div>
            {/* Ad 2 (300x600) */}
            <div className=" p-4 text-center">
            <ins
                className="adsbygoogle"
                style={{ display: "inline-block", width: "300px", height: "600px" }}
                data-ad-client="ca-pub-4765539220931071"
                data-ad-slot="3774960648"
                ></ins> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCourseLayout;