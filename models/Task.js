const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
