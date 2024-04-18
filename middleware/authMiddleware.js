const jwt = require("jsonwebtoken");
const User = require("../model/User");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    try {
      const existingUser = await User.findOne({
        phoneNumber: user.phoneNumber,
      });
      if (!existingUser) {
        console.log('User not found')
        return res.sendStatus(403);
      }
      req.user = existingUser;
      next();
    } catch (error) {
      res.status(500).json({ result_msg: error.message });
    }
  });
}

module.exports = {
  authenticateToken,
};
