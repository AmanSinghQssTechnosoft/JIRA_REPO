const express=require("express")


const{forgotPassword,resetPassword}=require("../controller/authController")

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports=router
