// components/ui/button.jsx
import React from "react";

const Button = ({ className, children, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
