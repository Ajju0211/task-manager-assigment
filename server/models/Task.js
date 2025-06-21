import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  assignedTo: {
    type: String,
    required: true,
    trim: true,
  },

  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  }
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

export default Task;
