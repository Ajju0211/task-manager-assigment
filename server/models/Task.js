const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  role: { type: String, enum: ["Frontend Developer", "Backend Developer", "Tester/QA", "Database Handler"] },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: Date,
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
