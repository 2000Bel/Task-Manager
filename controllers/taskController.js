const Task = require("../models/Task");



exports.showTasks = async (req, res) => {

  const tasks = await Task.find({ user: req.session.user._id });

  res.render("dashboard", { tasks });

};



exports.addTask = async (req, res) => {

  await Task.create({ ...req.body, user: req.session.user._id });

  res.redirect("/tasks");

};



exports.editTask = async (req, res) => {

  const task = await Task.findById(req.params.id);

  res.render("task_form", { task });

};



exports.updateTask = async (req, res) => {

  await Task.findByIdAndUpdate(req.params.id, req.body);

  res.redirect("/tasks");

};



exports.deleteTask = async (req, res) => {

  await Task.findByIdAndDelete(req.params.id);

  res.redirect("/tasks");

};
