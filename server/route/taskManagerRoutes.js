const express = require("express");
const { taskCreateController, taskUpdateController,getAllTaskController,deleteTaskController,getAllAssignedTaskController,getTaskbyId, getPaginatedAndSearchedTasks} = require("../controller/taskController");
const authorize = require("../middleware/authorize");
const router = express.Router();

router.post("/createtask", authorize, taskCreateController);
router.post("/updatetaskStatus", authorize, taskUpdateController);
router.post("/getAllAssignedTask",getAllAssignedTaskController)
router.post("/getAllTask",getAllTaskController);
router.get("/gettask/:taskId",getTaskbyId);
router.post("/deleteTask",deleteTaskController);
router.post("/getPaginatedTasks",getPaginatedAndSearchedTasks);
module.exports = router;