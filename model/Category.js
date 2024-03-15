const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const categorySchema = new mongoose.Schema({
  cid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
