//server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const ejs = require("ejs");

//import routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static("public"));

app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "myhardcodedsecret",
    resave: false,
    saveUninitialized: false,
  })
);

// connetion with DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
  mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


// Routes
app.use("/", authRoutes);
app.use("/tasks", taskRoutes);

 app.get("/", (req, res) => {
     res.render("login");
 });

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});




