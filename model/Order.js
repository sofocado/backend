const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  rid: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  tableId: {
    type: String,
    default: null,
  },
  menu: [
    {
      type: String,
      required: true,
    },
  ],
  quantity: [
    {
      type: Number,
      required: true,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  createTime: {
    type: Number,
    default: Math.floor(Date.now() / 1000),
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
