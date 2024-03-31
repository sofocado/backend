const reservationService = require("../services/reservationService");

async function addReservation(req, res) {
  try {
    const reservation = await reservationService.addReservation(req.body);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

async function listReservations(req, res) {
  try {
    const uid = req.body.uid; 
    const reservations = await reservationService.listReservations(uid);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function deleteReservation(req, res) {
  try {
    await reservationService.deleteReservation(req.body.reservationId);
    res.status(200).json({ result_msg: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

module.exports = {
  addReservation,
  listReservations,
  deleteReservation,
};
