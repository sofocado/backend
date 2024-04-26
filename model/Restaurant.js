const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const restaurantSchema = new mongoose.Schema({
  rid: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  address: String,
  workstarttime: Number,
  workendtime: Number,
  category: String,
  countTable: Number,
  rating: {
    type: Number,
    default: 0,
  },
  path: [String],
  phone: String,
  avgCheque: Number,
  parking: { type: Number, default: 0 },
  prayingRoom: { type: Number, default: 0 },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
