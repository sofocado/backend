const express = require("express");
const router = express.Router();
const favoriteController = require("../controller/favoriteController");

router.post("/add", favoriteController.addFavorite);
router.post("/list", favoriteController.listFavorites);
router.post("/delete", favoriteController.removeFavorite);

module.exports = router;
