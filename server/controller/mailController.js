const sendmail = require("../utils/nodemailer");

const mailController=async(req,res)=>{
  try{
        const {mail}=req.body;
        console.log(mail)
        if(!mail){
            return res.status(301).json({message:"please provide me email"})
        }
        const data=await sendmail(mail);

        return res.status(201).json({message:data})
  }
  catch(err){
    return res.status(500).json({})
  }
}
module.exports={mailController}