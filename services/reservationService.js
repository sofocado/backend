const Reservation = require("../model/Reservation");

async function addReservation(data) {
  try {
    const savedReservation = await new Reservation(data).save();
    return {
      result_code: 0,
      result_msg: "Success!",
      data: savedReservation,
    };
  } catch (error) {
    throw error;
  }
}

async function listReservations() {
  try {
    const reservations = await Reservation.find();
    return {
      result_code: 0,
      result_msg: "Success!",
      data: reservations,
    };
  } catch (error) {
    throw error;
  }
}

async function deleteReservation(data) {
  try {
    await Reservation.findOneAndDelete({ reservationId: data.reservationId });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addReservation,
  listReservations,
  deleteReservation,
};
