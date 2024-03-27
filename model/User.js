const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    rid: String,
    path: String,
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
