const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  rid: {
    type: String,
    required: true,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
