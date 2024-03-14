const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalname: String,
  mimetype: String,
  size: Number,
  destination: String,
  filename: String,
  path: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
