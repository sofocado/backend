const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../model/User");
const uuid = require("uuid");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const router = express.Router();
const refreshTokens = [];

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ phoneNumber: user.phoneNumber });
    res.json({ result_code: 0, data: accessToken });
  });
});

router.delete("/logout", (req, res) => {
  const tokenIndex = refreshTokens.indexOf(req.body.token);
  if (tokenIndex !== -1) refreshTokens.splice(tokenIndex, 1);
  res.sendStatus(204);
});

router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ result_msg: "Invalid phone number or password." });
    }

    const accessToken = generateAccessToken({ phoneNumber });
    const refreshToken = jwt.sign(
      { phoneNumber },
      process.env.REFRESH_TOKEN_SECRET
    );
    refreshTokens.push(refreshToken);

    res.json({
      result_code: 0,
      result_msg: "Success!",
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: user,
      },
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
});

router.post("/update", async (req, res) => {
  const { uid, name, phoneNumber, rid, path, password } = req.body;

  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ result_msg: "User not found." });
    }

    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.rid = rid || user.rid;
    user.path = path !== undefined ? (path !== null ? path : "") : user.path;

    // Если пароль передается в запросе, обновляем его
    if (password) {
      user.password = password;
    }

    await user.save();

    res.json({
      result_code: 0,
      result_msg: "User updated successfully.",
      user,
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { password, name, phoneNumber } = req.body;

  try {
    const uid = uuid.v4();
    const user = new User({ uid, password, name, phoneNumber });
    await user.save();
    res.status(201).json({ result_code: 0, result_msg: "User registered successfully." });
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}

module.exports = router;
