// src/components/ProfilePicSection.js
import React from "react";

const ProfilePicSection = () => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="relative">
        {/* Profile Image */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUayJgE_3bVA9uuIqClGEY78uGzfCwWWCQ5yL9tm_OdR-mn1Hv2o5qkSiQOUfmqGhMZg&usqp=CAU"
          alt="amarmau9"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-lg font-semibold">emailA@gmail.com</div>
      </div>
    </div>
  );
};

export default ProfilePicSection;
