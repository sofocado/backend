const Review = require("../model/Review");
const User = require("../model/User");
const Restaurant = require("../model/Restaurant");

async function calculateTotalRating(rid) {
  const reviews = await Review.find({ rid: rid });
  const totalReviews = reviews.length;
  const totalRating = reviews.reduce(
    (acc, review) => acc + review.avgRate.totalRate,
    0
  );
  return totalReviews > 0 ? totalRating / totalReviews : 0;
}

async function addReview(data) {
  const user = await User.findOne({ uid: data.uid });
  if (!user) {
    throw new Error("User not found");
  }

  const reviewData = {
    ...data,
    name: user.name,
    path: user.path,
  };

  const review = await Review.findOne({ rid: reviewData.rid });
  if (review) {
    const totalReviews = review.reviews.length + 1; 
    review.avgRate.totalRate =
      (review.avgRate.totalRate * review.reviews.length + reviewData.rating) /
      totalReviews;

    if (reviewData.rating >= 1 && reviewData.rating <= 5) {
      const ratingKey = ["one", "two", "three", "four", "five"][
        reviewData.rating - 1
      ];
      review.avgRate[ratingKey] += 1;
    }

    review.reviews.push(reviewData); 
    await review.save();

    const totalRating = await calculateTotalRating(reviewData.rid);
    await Restaurant.findOneAndUpdate(
      { rid: reviewData.rid },
      { rating: totalRating },
      { new: true }
    );

    return reviewData;
  } else {
    const newReview = new Review({
      rid: reviewData.rid,
      avgRate: {
        totalRate: reviewData.rating,
        five: reviewData.rating === 5 ? 1 : 0,
        four: reviewData.rating === 4 ? 1 : 0,
        three: reviewData.rating === 3 ? 1 : 0,
        two: reviewData.rating === 2 ? 1 : 0,
        one: reviewData.rating === 1 ? 1 : 0,
      },
      reviews: [reviewData],
    });
    await newReview.save();

    const totalRating = await calculateTotalRating(reviewData.rid);
    await Restaurant.findOneAndUpdate(
      { rid: reviewData.rid },
      { rating: totalRating },
      { new: true }
    );

    return reviewData;
  }
}

async function listReviews(rid) {
  const reviews = await Review.find({ rid: rid });
  const recordcount = reviews.reduce(
    (acc, review) => acc + review.reviews.length,
    0
  );
  return { recordcount, rows: reviews };
}

async function deleteReview(uid, reviewId) {
  const review = await Review.findOne({ reviewId });
  if (!review) {
    throw new Error("Review not found");
  }

  const reviewIndex = review.reviews.findIndex((r) => r.uid === uid);
  if (reviewIndex === -1) {
    throw new Error("Review not found for the given user");
  }
  const removedReview = review.reviews.splice(reviewIndex, 1)[0];
  const ratingKey = ["one", "two", "three", "four", "five"][
    removedReview.rating - 1
  ];
  review.avgRate[ratingKey] -= 1;

  const totalReviews = review.reviews.length;
  const totalRating = review.reviews.reduce(
    (acc, curr) => acc + curr.rating,
    0
  );
  review.avgRate.totalRate = totalReviews > 0 ? totalRating / totalReviews : 0;

  await review.save();
  return { message: "Review deleted successfully" };
}

module.exports = {
  addReview,
  listReviews,
  deleteReview,
};
