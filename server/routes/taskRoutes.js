// server/routes/taskRoutes.js

import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

// Route to create a task
router.post('/', createTask);

// Route to get all tasks with optional filters
router.get('/', getAllTasks);

// Route to get a task by ID
router.get('/:id', getTaskById);

// Route to update a task by ID
router.put('/:id', updateTask);

// Route to delete a task by ID
router.delete('/:id', deleteTask);

export default router;
