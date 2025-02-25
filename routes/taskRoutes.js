const express = require("express");

const { showTasks, addTask, editTask, updateTask, deleteTask } = require("../controllers/taskController");

const auth = require("../middleware/auth");



const router = express.Router();



router.use(auth);

router.get("/", showTasks);

router.post("/", addTask);

router.get("/:id/edit", editTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);



module.exports = router;



