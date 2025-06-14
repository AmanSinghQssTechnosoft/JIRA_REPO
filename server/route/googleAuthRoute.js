const express=require("express")
const { googlelogin } = require("../controller/authController")
const router=express.Router()

router.get("/google",googlelogin)
module.exports=router