const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const reservationSchema = new mongoose.Schema({
  reservationId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  rid: {
    type: String,
    required: true,
  },
  countTable: {
    type: Number,
    required: true,
  },
  reservationTime: {
    type: Number,
    required: true,
  },
  contacts: {
    type: String,
    required: true,
  },
  message: String,
  occasion: String,
  name: {
    type: String,
    required: true,
  },
  reservationCode: {
    type: String,
    required: true,
    default: () => Math.random().toString(36).substr(2, 8).toUpperCase(),
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
