const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const reservationSchema = new mongoose.Schema({
  reservationId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  resStatus: {
    type: Number,
    required: true,
    default: 0,
  },
  rid: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
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
  orderId: {
    type: String,
    default: null,
  },
  tableType: {
    type: Number,
    required: true,
  },
  tid: {
    type: String,
    required: true,
  },
  tableId: {
    type: String,
    required: true,
  },
  reservationStartTime: {
    type: Number,
    required: true,
  },
  reservationEndTime: {
    type: Number,
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
