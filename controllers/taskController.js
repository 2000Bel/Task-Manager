//controller/taskController.js
const express = require("express");
const Task = require("../models/Task");

const showTasks = async (req, res) => {
  try{
  const tasks = await Task.find({user: req.session.user._id});
  res.render("dashboard", { tasks});
} catch (error) {
  console.error(error);
  res.status(500).send("Server Error");
}
};

const addTask = async (req, res) => {
  const { title, description } = req.body;
  await Task.create({ title, description, user: req.session.user._id });
  res.redirect("/tasks");
}

const editTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.render("task_form", { task });
}

const updateTask = async (req, res) => {
  const { title, description } = req
    .body;
  await Task.findByIdAndUpdate(req.params.id, { title, description });
  res.redirect("/tasks");
}

const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/tasks");
}

module.exports = {
  showTasks,
  addTask,
  editTask,
  updateTask,
  deleteTask
};




