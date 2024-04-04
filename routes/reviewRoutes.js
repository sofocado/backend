const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");

router.post("/add", reviewController.addReview);
router.post("/list", reviewController.listReviews);
router.post("/delete", reviewController.deleteReview);

module.exports = router;
