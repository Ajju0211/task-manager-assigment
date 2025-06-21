import { useState,useEffect } from "react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import TaskEditor from "../components/TaskEditor";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";

// 🧠 Task service methods (modular API calls)
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "To Do",
  });
  const [filters, setFilters] = useState({ status: "", assignee: "" });
  const [tasks, setTasks] = useState([
    {
        _id: '1',
        title: 'Design Database Schema',
        description: 'Create MongoDB schema for users and tasks collections with proper relationships',
        assignedTo: 'Alice Johnson',
        status: 'In Progress',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-16')
      },
  ]);

  // ✅ Hardcoded team members (as per assignment)
  const teamMembers = [ "John", "Alex","Michel","Ajay"]

  // ✅ Fetch all tasks with filters
  const fetchTasks = async () => {
    try {
      const data = await getAllTasks(filters);
      console.log(data.data)
      setTasks(data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

useEffect(() => {
  fetchTasks();
}, [filters]);


  // ✅ Create or Update task
  const handleSubmit = async () => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
      } else {
        await createTask(formData);
      }
      await fetchTasks();
      resetForm();
    } catch (error) {
      console.error("Task submission failed:", error.message);
    }
  };

  // 🧹 Reset form and modal state
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      status: "To Do",
    });
    setEditingTask(null);
    setShowModal(false);
  };

  //  Group tasks by status
  const groupedTasks = {
    "To Do": tasks.filter((t) => t.status === "To Do"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    Done: tasks.filter((t) => t.status === "Done"),
  };

  //  Dashboard stats
  const stats = {
    total: tasks.length,
    toDo: groupedTasks["To Do"].length,
    inProgress: groupedTasks["In Progress"].length,
    done: groupedTasks["Done"].length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setShowModal={setShowModal} />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6 ">
          <Sidebar />

          {/* Main Section */}
          <main className="max-w-7xl mx-auto p-6">
            <MainContent
              filters={filters}
              setFilters={setFilters}
              stats={stats}
              teamMembers={teamMembers}
              groupedTasks={groupedTasks}
              setEditingTask={setEditingTask}
              setShowModal={setShowModal}
              fetchTasks={fetchTasks}
              deleteTask={deleteTask}
            />
          </main>

          <RightSidebar teamMembers={teamMembers} tasks={tasks} stats={stats} />

          {/* Task Modal */}
          <TaskEditor
            showModal={showModal}
            setShowModal={setShowModal}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            teamMembers={teamMembers}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
