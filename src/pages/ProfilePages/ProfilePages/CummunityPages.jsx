import React, { useState } from "react";

const CommunitySection = () => {
  const [activeTab, setActiveTab] = useState("COMMUNITY");

  const articles = [
    {
      id: 1,
      title: "Mastering JavaScript Closures",
      date: "April 10, 2025",
      description: "A deep dive into closures with practical examples and visual explanations.",
    },
    {
      id: 2,
      title: "React Hooks Simplified",
      date: "April 9, 2025",
      description: "Understand useState, useEffect, and custom hooks in a simple way.",
    },
  ];

  const improvements = []; // Empty for demo

  const community = []; // Empty for demo

  const renderContent = () => {
    const data =
      activeTab === "ARTICLES"
        ? articles
        : activeTab === "IMPROVEMENTS"
        ? improvements
        : community;

    if (data.length === 0) {
      return (
        <div className="text-center text-gray-300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4138/4138124.png"
            alt="No data"
            className="mx-auto mb-6 w-48 h-48"
          />
          <h2 className="text-xl font-semibold mb-2">You hasn't posted any {activeTab.toLowerCase()} yet!</h2>
          <p className="mb-6 text-sm text-gray-400">
            You may use <span className="font-semibold text-white">GeeksforGeeks Community</span> to help other geeks.
          </p>
          <div className="flex justify-center gap-4">
            <button className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition">
              Share your thoughts
            </button>
            <button className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition">
              Share your experience
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 gap-6 text-white">
        {data.map((item) => (
          <div key={item.id} className="bg-[#2a2a2a] rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-bold mb-1">{item.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{item.date}</p>
            <p className="text-gray-300 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#121212] min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] rounded-lg w-full max-w-5xl p-8">
        {/* Tabs */}
        <div className="flex justify-around border-b border-gray-700 mb-8">
          {["ARTICLES", "IMPROVEMENTS", "COMMUNITY"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 transition ${
                activeTab === tab
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-300 hover:text-green-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default CommunitySection;
