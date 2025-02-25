require("dotenv").config();

const express = require("express");

const mongoose = require("./config/db");

const session = require("express-session");

const methodOverride = require("method-override");

const morgan = require("morgan");



const authRoutes = require("./routes/authRoutes");

const taskRoutes = require("./routes/taskRoutes");



const app = express();



// Configuración de Middleware

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static("public"));

app.use(morgan("dev"));



app.use(

  session({

    secret: "myhardcodedsecret",

    resave: false,

    saveUninitialized: false,

  })

);



// Configurar Motor de Vistas EJS

app.set("view engine", "ejs");



// Rutas

app.use("/", authRoutes);

app.use("/tasks", taskRoutes);



// Servidor

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


