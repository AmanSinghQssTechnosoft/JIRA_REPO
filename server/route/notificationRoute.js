const express=require("express");
const router=express.Router();
const {getNotifications, markAsRead} = require("../controller/notificationController");

router.get("/", getNotifications);
router.patch("/:id/read", markAsRead);

module.exports = router;
