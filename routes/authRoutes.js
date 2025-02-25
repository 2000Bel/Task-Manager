const express = require("express");

const { showLogin, showRegister, register, login, logout } = require("../controllers/authController");



const router = express.Router();



router.get("/login", showLogin);

router.get("/register", showRegister);

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);



module.exports = router;


