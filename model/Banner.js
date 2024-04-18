const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const bannerSchema = new mongoose.Schema({
  bannerId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  rid: String,
  path: String,
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
