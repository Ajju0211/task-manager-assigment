import {
  AlertCircle,
  CheckCircle,
  Clock,
  Edit2,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useTaskContext } from "../context/useTarskContext";

// Icon based on status
const getStatusIcon = (status) => {
  switch (status) {
    case "Done":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "In Progress":
      return <Clock className="w-4 h-4 text-blue-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

// Badge color by status
const getStatusColor = (status) => {
  switch (status) {
    case "Done":
      return "bg-green-100 text-green-800 border-green-200";
    case "In Progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Avatar color generator
const getAvatarColor = (name) => {
  const colors = [
    "bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-green-500",
    "bg-yellow-500", "bg-red-500", "bg-indigo-500", "bg-orange-500",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

const TaskCard = ({ task }) => {
  const { setEditingTask, setShowModal, fetchTasks } = useTaskContext();
  const [expanded, setExpanded] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditingTask(task._id);
    setShowModal(true);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const { deleteTask } = await import("../services/taskService");
      await deleteTask(task._id);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  const updateTaskStatus = async (taskId, newStatus, e) => {
    e.stopPropagation();
    try {
      const { updateTask } = await import("../services/taskService");
      await updateTask(taskId, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error("Status update failed:", err.message);
    }
  };

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer px-4 py-3 mb-4 group"
    >
      {/* Top Row: Title & Assignee */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
          {task.title}
        </h3>
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 ${getAvatarColor(task.assignedTo)} rounded-full flex items-center justify-center text-white text-xs font-semibold`}
          >
            {task.assignedTo?.charAt(0)}
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      {expanded && (
        <>
          {/* Status & Actions */}
          <div className="flex justify-between items-start mt-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(task.status)}
              <span className={`text-xs font-medium border px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-blue-600"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-600"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-3 leading-snug">
            {task.description}
          </p>

          {/* Status Dropdown */}
          {task.status !== "Done" && (
            <div className="mt-4">
              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task._id, e.target.value, e)}
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 pt-3 border-t text-xs text-gray-500 flex justify-between">
            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
            <span>ID: #{task._id.slice(-4)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
