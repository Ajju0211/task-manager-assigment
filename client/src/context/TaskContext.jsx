import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

// Create context
const TaskContext = createContext();

// Export custom hook for easy use
export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", assignee: "" });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "To Do",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const teamMembers = ["Ajay", "Neha", "John", "Alice"];

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks(filters);
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
      } else {
        await createTask(formData);
      }
      fetchTasks();
      resetForm();
    } catch (err) {
      console.error("Submit failed:", err.message);
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

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        filters,
        setFilters,
        formData,
        setFormData,
        editingTask,
        setEditingTask,
        showModal,
        setShowModal,
        teamMembers,
        fetchTasks,
        handleSubmit,
        resetForm,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
