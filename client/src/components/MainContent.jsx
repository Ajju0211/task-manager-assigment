// src/components/MainContent.jsx

import { Filter, X, BarChart3, AlertCircle, Clock, CheckCircle } from "lucide-react";
import TaskColumn from "./TaskColumn";
import StatCard from "./StatCard";
import { useTaskContext } from "../context/useTarskContext";

const MainContent = () => {
  const {
    filters,
    setFilters,
    stats,
    teamMembers,
    groupedTasks,

  } = useTaskContext();

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
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>

          {(filters.status || filters.assignee) && (
            <button onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Tasks" count={stats.total} icon={<BarChart3 />} />
        <StatCard label="To Do" count={stats.toDo} icon={<AlertCircle />} />
        <StatCard label="In Progress" count={stats.inProgress} icon={<Clock />} color="blue" />
        <StatCard label="Completed" count={stats.done} icon={<CheckCircle />} color="green" />
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks}
          />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
