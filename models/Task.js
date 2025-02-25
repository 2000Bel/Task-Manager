const mongoose = require("mongoose");



const TaskSchema = new mongoose.Schema({

  title: { type: String, required: true },

  description: { type: String },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

});



module.exports = mongoose.model("Task", TaskSchema);
