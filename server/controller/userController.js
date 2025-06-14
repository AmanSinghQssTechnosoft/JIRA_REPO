const generate = require("../utils/generate");
const pool = require("../db/db")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    try {
        console.log("hii", req.body)
        const { name, email, role, password } = req.body;
        console.log(name, email, role, password)
        const user = await pool.query('SELECT * FROM users where email=$1', [email]);
        if (user.rows.length > 0) {
            return res.status(504).json({ message: "user already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password, salt);
        const Newuser = await pool.query('INSERT INTO USERS (name,email,password,role) values($1,$2,$3,$4) RETURNING *', [name, email, newpassword, role]);
        const jwttoken = generate(Newuser.rows[0].id)
        console.log("jwt", jwttoken)
        return res.status(200).json({ user: Newuser.rows[0], jwttoken })
    }
    catch (err) {
        return res.status(404).json({ message: "server Invalid error detected" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: "invalid request detected" })
        }
        const user = await pool.query('SELECT * FROM users where email=$1', [email])
        if (user.rows.length < 0) {
            return res.status(404).json({ message: "user not found in database" })
        }
        const isMatch = await bcrypt.compare(password, user.rows[0].password)
        if (!isMatch) {
            return res.status(404).json({ message: "you have given wrong login request" })
        }
        const jwttoken = generate(user.rows[0].id)
        return res.status(200).json({ user: user.rows[0], jwttoken })
    }
    catch (err) {
        return res.status(404).json({ message: "server Invalid error detected" })
    }
}

const getalluser = async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        return res.status(200).json({ alluser: allUsers.rows });
    } catch (err) {
        console.error("DB error:", err);
        return res.status(500).json({ message: "Server error occurred" });
    }
};

const getuser=async(req,res)=>{
      try{
        console.log("req.params",req.params)
          const{id}=req.params;
          const userData=await pool.query('SELECT * FROM users where id=$1',[id])
          return res.status(200).json({userData:userData.rows[0]})
      }
      catch(err){
        return res.status(500).json({message:"invalid data request detected"})
      }
}

module.exports = { register, login, getalluser,getuser }