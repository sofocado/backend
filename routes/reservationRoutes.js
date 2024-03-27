const express = require("express");
const router = express.Router();
const reservationController = require("../controller/reservationController");

router.post("/add", reservationController.addReservation);
router.post("/list", reservationController.listReservations);
router.post("/delete", reservationController.deleteReservation);

module.exports = router;
