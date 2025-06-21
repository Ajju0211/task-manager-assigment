import { AlertCircle, CheckCircle, Clock, Edit2, Trash2 } from "lucide-react";
 
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

   const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

   const getAvatarColor = (name) => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-orange-500'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };


 
 const TaskCard = ({ task, setEditingTask }) => (
    <div className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon(task.status)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowModal(true)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit Task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(task._id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${getAvatarColor(task.assignedTo)} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
           
          </div>
          <span className="text-sm text-gray-700">{task.assignedTo}</span>
        </div>
      </div>

      {task.status !== 'Done' && (
        <div className="pt-3 border-t">
          <select
            value={task.status}
            onChange={(e) => updateTaskStatus(task._id, e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-2 border-t text-xs text-gray-500">
        <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
        <span>ID: {task._id.slice(-4)}</span>
      </div>
    </div>
  );

  export default TaskCard