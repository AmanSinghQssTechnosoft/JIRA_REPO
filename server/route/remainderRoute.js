const express=require("express");
const router=express.Router();
const { createReminder,checkReminders}=require("../controller/remainderController");

router.post("/createreminder", createReminder);

module.exports = router;