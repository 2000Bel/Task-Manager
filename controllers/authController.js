
const User = require("../models/User");

const bcrypt = require("bcryptjs");



exports.showLogin = (req, res) => res.render("login");

exports.showRegister = (req, res) => res.render("register");



exports.register = async (req, res) => {

  const { name, email, password } = req.body;

  try {

    await User.create({ name, email, password });

    res.redirect("/login");

  } catch (err) {

    res.send("Error al registrar usuario");

  }

};



exports.login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });



  if (!user || !(await bcrypt.compare(password, user.password))) {

    return res.send("Credenciales incorrectas");

  }



  req.session.user = user;

  res.redirect("/tasks");

};



exports.logout = (req, res) => {

  req.session.destroy(() => res.redirect("/login"));
};


