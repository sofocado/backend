const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const cardSchema = new mongoose.Schema({
  cardId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: Number,
    required: true,
  },
  validthru: {
    type: String,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
