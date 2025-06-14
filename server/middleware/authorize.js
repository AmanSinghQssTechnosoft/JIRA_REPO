const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  try {
    console.log("token",req.body)
    const authHeader = req.headers.authorization; 
   console.log(authHeader)
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return res.status(401).json({ message: "User is not authorized (no or bad token)" });
    }

    const token = authHeader.split(" ")[1]; 

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;

    next(); 
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authorize;
