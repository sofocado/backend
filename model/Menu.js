const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const menuSchema = new mongoose.Schema({
  menuId: {
    type: String,
    type: uuidv4,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ingredient: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
