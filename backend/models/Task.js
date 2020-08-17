const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, trim: true, minlength: 4, required: true },
  dueDate: { type: String },
  status: {
    type: String,
    enum: ["todo", "complete", "incomplete"],
    default: "todo",
    required: true,
  },
  archived: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  list: {
    type: String,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
