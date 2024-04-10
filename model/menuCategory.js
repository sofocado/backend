const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const menuCategorySchema = new mongoose.Schema({
  mcid: {
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

const MenuCategory = mongoose.model("MenuCategory", menuCategorySchema);

module.exports = MenuCategory;
