const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restourantController");

router.post("/add", restaurantController.addRestaurant);
router.post("/list", restaurantController.listRestaurants);
router.post("/get", restaurantController.getRestaurant);
router.post('/update', restaurantController.updateRestaurant)

module.exports = router;
