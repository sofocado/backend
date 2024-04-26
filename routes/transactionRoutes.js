const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transactionController");

router.post("/add", transactionController.addTransaction);
router.post("/list", transactionController.listTransaction);
router.post("/delete", transactionController.deleteTransaction);
router.post("/get", transactionController.getTransaction);

module.exports = router;
