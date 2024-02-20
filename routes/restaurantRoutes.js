const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restourantController");

router.post("/add", restaurantController.addRestaurant);

module.exports = router;