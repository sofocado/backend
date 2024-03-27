const express = require("express");
const authService = require("../services/authService");
const router = express.Router();

router.post("/token", authService);
router.delete("/logout", authService);
router.post("/login", authService);
router.post("/register", authService);
router.post("/update", authService);

module.exports = router;
