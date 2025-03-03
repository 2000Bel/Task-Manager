//controllers/authController.js
const express = require("express");
const User = require("../models/User");
const Task = require("../models/Task");

const register = async (req, res) => {
  try{
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.send("User already exists");
  }
  const newUser = new User({ name, email, password});
  await newUser.save();
  return res.redirect("/login");
} catch (error) {
  console.error(error);
  res.status(500).send("Server Error");
}
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.send("invalid email or password");
  } 
  req.session.user = user;
  const tasks = await Task.find({user: user._id});
  res.redirect("/tasks");
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
}

module.exports = { login, register, logout};


