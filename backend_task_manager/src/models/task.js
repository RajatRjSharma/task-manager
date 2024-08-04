import mongoose from "mongoose";

/**
 * Schema for the Task object
 */
const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true, unique: true, trim: true },
  dueBy: { type: Date, required: true },
  status: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
