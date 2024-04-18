// routes/cardRoutes.js
const express = require("express");
const router = express.Router();
const cardController = require("../controller/cardController");

router.post("/add", cardController.addCard);
router.post("/get", cardController.getCard);
router.post("/delete", cardController.deleteCard);

module.exports = router;
