import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/tasks';

// Get all the tasks from back-end
export const getAllTasks = async ( ) => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch tasks');
  }
};

// Create one task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(BASE_URL, taskData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to create task');
  }
};

// Update tasks
//@pops taskId, updateData 'taskId will provided from the backend '
export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${taskId}`, updatedData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to update task');
  }
};

//@delete Delete the task using Id 
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${taskId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to delete task');
  }
};
