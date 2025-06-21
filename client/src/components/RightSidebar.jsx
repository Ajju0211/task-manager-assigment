// SidebarInfoPanel.jsx
import React from "react";

// Helper functions
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getAvatarColor = (name) => {
  const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500"];
  const index = name.length % colors.length;
  return colors[index];
};

const RightSidebar = ({ teamMembers = [], tasks = [], stats = {} }) => {
  return (
    <div className="w-80 space-y-6">
      {/* Team Members */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <h3 className="font-medium text-gray-900 mb-4">TEAM MEMBERS</h3>
        <div className="space-y-3">
          {teamMembers.slice(0, 6).map((member) => {
            const memberTasks = tasks.filter((t) => t.assignedTo === member);
            return (
              <div key={member} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 ${getAvatarColor(
                      member
                    )} rounded-full flex items-center justify-center text-white text-xs font-medium`}
                  >
                    {getInitials(member)}
                  </div>
                  <span className="text-sm text-gray-700">{member}</span>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {memberTasks.length} tasks
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <h3 className="font-medium text-gray-900 mb-4">QUICK STATS</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active Tasks</span>
            <span className="font-medium text-gray-900">{stats.inProgress}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Completion Rate</span>
            <span className="font-medium text-green-600">
              {stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Team Members</span>
            <span className="font-medium text-gray-900">{teamMembers.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
