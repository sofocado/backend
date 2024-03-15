const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true,
  },
  user: {
    type: String, 
    required: true,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
