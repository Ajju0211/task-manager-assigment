import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

// Create context
const TasksContext = createContext();

// Provider component
export const ContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "To Do",
  });

  // Use object instead of array for filters
  const [filters, setFilters] = useState({ status: "", assignee: "" });

  const [allTasks, setAllTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  const teamMembers = ["John", "Alex", "Michel", "Ajay"];

  // Fetch all tasks once (unfiltered)
  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setAllTasks(res.data || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error.message);
    }
  };

  // Filter tasks on frontend
  useEffect(() => {
    let filtered = allTasks;

    if (filters.status) {
      filtered = filtered.filter((task) => task.status === filters.status);
    }

    if (filters.assignee) {
      filtered = filtered.filter(
        (task) => task.assignedTo === filters.assignee
      );
    }

    setTasks(filtered);
  }, [filters, allTasks]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create or update a task
  const handleSubmit = async () => {
    try {
      if (editingTask) {
        await updateTask(editingTask, formData);
        // Replace the updated task manually
        setAllTasks((prev) =>
          prev.map((task) =>
            task._id === editingTask ? { ...task, ...formData } : task
          )
        );
      } else {
        const res = await createTask(formData);
        // 👇 Add the new task directly to allTasks
        setAllTasks((prev) => [...prev, res.data]);
      }
      resetForm();
    } catch (err) {
      console.error("Error submitting task:", err.message);
    }
  };

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

  const groupedTasks = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Done: tasks.filter((task) => task.status === "Done"),
  };

  const stats = {
    total: tasks.length,
    toDo: groupedTasks["To Do"].length,
    inProgress: groupedTasks["In Progress"].length,
    done: groupedTasks["Done"].length,
  };

  const values = {
    tasks,
    setTasks,
    filters,
    setFilters,
    groupedTasks,
    stats,
    teamMembers,
    editingTask,
    setEditingTask,
    formData,
    setFormData,
    showModal,
    setShowModal,
    fetchTasks,
    handleSubmit,
    resetForm,
    deleteTask,
  };

  return (
    <TasksContext.Provider value={values}>{children}</TasksContext.Provider>
  );
};

// Hook to access the context
export const useTaskContext = () => useContext(TasksContext);
