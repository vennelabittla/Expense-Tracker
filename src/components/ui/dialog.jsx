// components/ui/dialog.jsx
import React from "react";

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog content */}
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

const DialogContent = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

const DialogHeader = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

const DialogTitle = ({ children }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

const DialogFooter = ({ children }) => {
  return <div className="mt-6 flex justify-end gap-3">{children}</div>;
};

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter };