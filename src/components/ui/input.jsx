// components/ui/input.jsx
import React from "react";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`px-4 py-2 rounded border border-gray-300 ${className}`}
      {...props}
    />
  );
};

export { Input };
