import React from "react";
import { useNavigate } from "react-router-dom";
const First = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white">
      Fir hello hello hello hello hello hello hello hello hello hello hello
      hello hello hello hello hello hello hello hello hello hello hello hello
      hello hello hello hello hello hello hello hello hello hello hello hello
      hello hello hello hello hello hello hello hello hello hello hello hello
      hello hello hello hello hello hello hello hello hello hello hello hello
      hello hello hello hello hello hello hello hello hello hello hello hello
      hello hello hello hello hello hello hello hello hello hello hello hello
      hello hello hello hello hello hello hello hello hello hello hello hello
      hello hello hello hello hello hello hello hello hello hello hello hello
      hello hello hello hello hello hello hello hello hello hello hello
      <button onClick={() => navigate("/about")} className="bg-red-600">
        Click to navigate
      </button>
    </div>
  );
};

export default First;
