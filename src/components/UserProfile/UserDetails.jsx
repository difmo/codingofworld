// src/components/UserDetails.js
import React from "react";
import ProfilePicSection from "./ProfilePicSection";
import ScoreCard from "./ScoreCard";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      {/* Profile Section */}
      <ProfilePicSection />

      {/* Education Section */}
      <div className="flex justify-between mb-4">
        <div>
          <div className="text-sm font-medium">Institution</div>
          <div className="text-lg">college Group of Institute</div>
        </div>
        <div>
          <div className="text-sm font-medium">Language Used</div>
          <div className="text-lg">C++</div>
        </div>
      </div>

      {/* Scorecards Section */}
      <div className="space-y-4">
        <ScoreCard
          title="Coding Score"
          score="28"
          iconSrc="https://media.geeksforgeeks.org/auth-dashboard-uploads/Group-96.svg"
          iconAlt="Coding Score"
        />
        <ScoreCard
          title="Problems Solved"
          score="15"
          iconSrc="https://media.geeksforgeeks.org/auth-dashboard-uploads/Group-12723.svg"
          iconAlt="Problems Solved"
        />
        <ScoreCard
          title="Contest Rating"
          score="N/A"
          iconSrc="https://media.geeksforgeeks.org/auth-dashboard-uploads/ratingsCardImg.png"
          iconAlt="Contest Rating"
        />
      </div>

      {/* Campus Ambassador Link */}
      <button className="p-4 text-white rounded bg-primary" onClick={()=>navigate("/all-blogs")}>Make blogs</button>
      <LogoutButton />
    </div>
  );
};

export default UserDetails;
