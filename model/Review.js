const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const reviewSchema = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
  },
  avgRate: {
    totalRate: {
      type: Number,
      required: true,
    },
    five: {
      type: Number,
      required: true,
    },
    four: {
      type: Number,
      required: true,
    },
    three: {
      type: Number,
      required: true,
    },
    two: {
      type: Number,
      required: true,
    },
    one: {
      type: Number,
      required: true,
    },
  },
  reviews: [
    {
      uid: {
        type: String,
        required: true,
      },
      reviewId: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      path: {
        type: String,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createTime: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
