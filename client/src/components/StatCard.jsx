// src/components/StatCard.jsx
import React from "react";

const StatCard = ({ label, count, icon, color = "gray" }) => {
  const colors = {
    gray: "bg-gray-100 text-gray-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{count}</p>
        </div>
        <div className={`p-2 rounded-full ${colors[color]}`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
