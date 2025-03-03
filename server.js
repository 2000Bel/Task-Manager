//server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const Task = require('./models/Task');

const {register, login, logout} = require("./controllers/authController");
const {showTasks, addTask, editTask, updateTask, deleteTask} = require("./controllers/taskController");

const auth = require("./middleware/auth");

const app = express();

//EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(morgan("dev"));

app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }));

// connetion to DB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected on MongoDB ${mongoose.connection.name}`);
});

//Routes
 app.get("/", (req, res) => {
     res.render("login");
  });
app.get("/login", (req, res) =>{
  res.render("login");
});
app.get("/register", (req, res) =>{
  res.render("register");
});
app.get("/dashboard", auth, async (req,res)=>{
    const tasks = await Task.find({user:req.session.user._id});
    res.render("dashboard", {user: req.session.user, tasks});
});
app.post("/login", login);
app.post("/register", register);
app.get("/tasks/new", auth, (req, res) => {
    res.render("task_form", { task: null });
});
app.get("/tasks", auth, showTasks);
  app.get("/tasks/new", auth, (req, res) => {
      res.render("task_form", { task: null });
  });
  app.post("/tasks", auth, addTask);
  app.get("/tasks/:id/edit", auth, editTask);
  app.put("/tasks/:id", auth, updateTask);
  app.delete("/tasks/:id", auth, deleteTask);
  app.get("/logout", logout);


app.listen(3000, () => {
  console.log('Listening on Port 3000');
});




