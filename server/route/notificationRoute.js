const express=require("express");
const router=express.Router();
const {getNotifications, markAsRead} = require("../controller/notificationController");

router.post("/getNotifications", getNotifications);
router.get("/:id/read", markAsRead);

module.exports = router;
