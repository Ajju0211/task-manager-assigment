// server/controllers/taskController.js

import Task from '../models/Task.js';

// @desc    Create a new task
// @route   POST /api/tasks

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;
    const task = new Task({ title, description, assignedTo, status });
    await task.save();
    res.status(201).json({status: 200, data: task});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Get all tasks (with optional filters)
// @route   GET /api/tasks
export const getAllTasks = async (req, res) => {
  try {
    const { status, assignedTo } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter);
    res.json({status: 200, data: tasks});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({status: 200, data: task});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update a task by ID
// @route   PUT /api/tasks/:id

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({status: 200, data: updatedTask});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete a task by ID
// @route   DELETE /api/tasks/:id

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({status: 200, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
