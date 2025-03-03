//controllers/authController.js
const express = require("express");
const Task = require("../models/Task");
const isSignedIn = require("../middleware/is-signed-in");

const router = express.Router();

router.get("/tasks", isSignedIn, async (req, res) => {
  const tasks = await Task.find({ user: req.session.user._id });
  res.render("dashboard", { tasks });
});

// New task form
router.get("/tasks/new", isSignedIn, (req, res) => {
  res.render("task_form", {task:null});
});

// Creat new task
router.post("/tasks", isSignedIn, async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description, user: req.session.user._id });
  await newTask.save();
  res.redirect("/tasks");
});

// Edit task
router.get("/tasks/:id/edit", isSignedIn, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if(!task) return res.send("Task not found");
  res.render("task_form", { task });
});

//Update task
router.put("/tasks/:id", isSignedIn, async (req, res) => {
  const { title, description } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { title, description });
  res.redirect("/tasks");
});

//Delete task
router.delete("/tasks/:id", isSignedIn, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/tasks");
});

module.exports = router;