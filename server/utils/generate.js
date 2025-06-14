const jwt = require("jsonwebtoken")

function generate(user_id) {
   return jwt.sign({ user_id }, process.env.JWT_KEY, {
      expiresIn: "1h"
   })
}

module.exports = generate