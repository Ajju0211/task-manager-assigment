import React from "react";
import { Filter, X, BarChart3, AlertCircle, Clock, CheckCircle } from "lucide-react";
import TaskCard from "./TaskCard";

// Reusable Card for showing stats
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

const MainContent = ({ filters, setFilters, stats, teamMembers, groupedTasks,setEditingTask }) => {
  const clearFilters = () => setFilters({ status: "", assignee: "" });

  return (
    <div className="flex-1">
      {/* Header and Filters */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Collaborative Task Manager</h1>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          {/* Assignee Filter */}
          <select
            value={filters.assignee}
            onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Assignees</option>
            {teamMembers.map((member) => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>

          {/* Clear Filter Button */}
          {(filters.status || filters.assignee) && (
            <button onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Tasks" count={stats.total} icon={<BarChart3 />} />
        <StatCard label="To Do" count={stats.toDo} icon={<AlertCircle />} />
        <StatCard label="In Progress" count={stats.inProgress} icon={<Clock />} color="blue" />
        <StatCard label="Completed" count={stats.done} icon={<CheckCircle />} color="green" />
      </div>

      {/* Task Columns (Kanban Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{status}</h2>
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{tasks.length}</span>
            </div>

            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="bg-white border-2 border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
                  No tasks in {status}
                </div>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task}  />)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
