const express=require("express")
const {mailController}=require("../controller/mailController")
const router=express.Router()
router.post("/nodemailer",mailController)
module.exports=router