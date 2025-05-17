import React from "react";

const CustomSelect = ({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  icon: Icon,
  error,
}) => {
  return (
    <div className="mt-6">
      <div className="relative">
        {Icon && (
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon />
          </div>
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded bg-white appearance-none focus:ring-2 focus:ring-red-300 outline-none transition-all duration-200 ${
            Icon ? "pl-10" : ""
          } ${error ? "border-red-500" : "border-gray-300"}`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-red-500 mt-1 pl-1">{error}</p>}
    </div>
  );
};

export default CustomSelect;
