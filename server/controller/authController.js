const pool = require("../db/db");
const crypto=require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

 const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); 
  try {
    await pool.query(
      "INSERT INTO password_reset_tokens (email, token, expires_at) VALUES ($1, $2, $3)",
      [email, token, expiresAt]
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amancode177@gmail.com",
        pass: "ktmchwpiyhmlpyco",
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click below to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
    });

    res.json({ message: "Reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
 const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT email, expires_at FROM password_reset_tokens WHERE token = $1",
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const { email, expires_at } = result.rows[0];
    if (new Date() > new Date(expires_at)) {
      return res.status(400).json({ message: "Token expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, email]);

    await pool.query("DELETE FROM password_reset_tokens WHERE token = $1", [token]);

    res.json({ message: "Password successfully reset" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const generate = require("../utils/generate");
const { oauth2client } = require("../utils/googleConfig");
const axios = require('axios');

const googlelogin=async(req,res)=>{
    
try{
     const {code}=req.query;
     console.log("code",code)
     const googleRes=await oauth2client.getToken(code);
     oauth2client.setCredentials(googleRes.tokens);
     const userRes=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
     const {email,name,password}=userRes.data;
     console.log("email",email,name)
     const user=await pool.query('SELECT * FROM  users WHERE email=$1',[email])

     let createuser;
     console.log("user.rows.length",user.rows.length)
     if(user.rows.length===0){
      createuser=await pool.query('INSERT INTO users (email,name,password) VALUES ($1,$2) RETURNING *',[email,name,"123"]);
     }
   const id = createuser?.rows?.[0]?.id || user?.rows?.[0]?.id;
       
if (!id) {
  return res.status(500).json({ message: "User creation failed" });
}

const token = generate(id);
return res.status(200).json({ user: createuser?.rows?.[0] || user?.rows?.[0], token });

}
catch(err){
    return res.status(400).json({message:"server not found"})
}
}

module.exports = {forgotPassword,resetPassword,googlelogin}