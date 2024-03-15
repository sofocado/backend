const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  rid: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  address: String,
  workstarttime: Number,
  workendtime: Number,
  isFavorite: { type: Number, default: 0 },
  category: String,
  countTable: Number,
  path: String,
  phone: String,
  avgCheque: Number,
  parking: { type: Number, default: 0 },
  prayingRoom: { type: Number, default: 0 },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
