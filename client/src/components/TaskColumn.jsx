import { useState } from "react";
import TaskCard from "./TaskCard";
import { ChevronDown, ChevronRight } from "lucide-react";

const TaskColumn = ({ status, tasks }) => {
  const [showList, setShowList] = useState(true);

  const toggleList = () => setShowList((prev) => !prev);

  return (
    <div className=" m-2 p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-semibold text-gray-800 tracking-tight">
            {status}
          </h2>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
            {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
          </span>
        </div>

        <button
          onClick={toggleList}
          className="flex items-center cursor-pointer text-sm text-gray-500 hover:text-blue-600 transition-all"
        >
          {showList ? (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              <span>Hide</span>
            </>
          ) : (
            <>
              <ChevronRight className="w-4 h-4 mr-1" />
              <span>Show</span>
            </>
          )}
        </button>
      </div>

      {/* Task List */}
      {showList && (
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="bg-gray-50 border border-dashed rounded-md p-6 text-center text-sm text-gray-500">
              No tasks in <strong>{status}</strong>
            </div>
          ) : (
            tasks.map((task) => <TaskCard key={task._id} task={task} />)
          )}
        </div>
      )}
    </div>
  );
};

export default TaskColumn;
