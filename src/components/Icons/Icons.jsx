import React from "react";

const IconsComponent = ({ IconName }) => {
  return (
    <button
      type="button"
      className="mx-1 text-white transition duration-150 ease-in-out rounded-full shadow h-9 w-9 bg-primary hover:bg-primary-600"
    >
      <IconName className="h-3.5 w-3.5 mx-auto" />
    </button>
  );
};

export default IconsComponent;
