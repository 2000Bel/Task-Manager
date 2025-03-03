//server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

const port = process.env.PORT ? process.env.PORT : "3000";


const passUserToView = require("./middleware/pass-user-to-view");
const authController = require("./controllers/authController");
const taskController = require("./controllers/taskController");


const app = express();

//EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"))

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);

// connetion to DB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected on MongoDB ${mongoose.connection.name}`);
});

//Routes
 app.use("/", authController);
 app.use("/", taskController);

app.listen(port, () => {
  console.log(`Listening on Port ${port}!`);
});




