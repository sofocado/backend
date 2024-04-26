// transactionModel.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const transactionSchema = new mongoose.Schema({
  transactionId: {
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
  cardId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createTime: {
    type: Number,
    default: Math.floor(Date.now() / 1000),
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
