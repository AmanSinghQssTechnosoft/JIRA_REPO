const express =require("express")
const { register, login,getalluser,getuser } = require("../controller/userController")
// const authorize=require("../middleware/authorize")
const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/getalluser",getalluser);
router.get("/getuser/:id",getuser)
module.exports=router