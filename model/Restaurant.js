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
  startTime: Number,
  endTime: Number,
  countTable: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
