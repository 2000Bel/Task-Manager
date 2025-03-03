//controllers/authController.js
const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", (req, res) => res.render("login"));
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

router.post("/register", async (req, res) => {  
  try {
    const { name, email, password } = req.body;
  
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    const newUser = new User({ name, email, password});
    await newUser.save();

    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    if (user.password != password) return res.status(400).send("Invalid password");

    req.session.user = user;
    res.redirect("/tasks");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/logout", (req, res) => {
req.session.destroy();
  res.redirect("/login");
});

module.exports = router;

