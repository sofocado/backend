const express = require("express");
const router = express.Router();
const orderController = require('../controller/orderController');

router.post("/add", orderController.addOrder);
router.post("/list", orderController.listOrders);
router.post("/delete", orderController.deleteOrder);
router.post("/get", orderController.getOrder);

module.exports = router;
