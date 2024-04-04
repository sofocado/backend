const Review = require("../model/Review");
const User = require("../model/User");

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
    const totalReviews = review.reviews.length + 1; // Including the new review
    review.avgRate.totalRate =
      (review.avgRate.totalRate * review.reviews.length + reviewData.rating) /
      totalReviews;

    // Increment the corresponding rating count
    if (reviewData.rating >= 1 && reviewData.rating <= 5) {
      const ratingKey = ["one", "two", "three", "four", "five"][
        reviewData.rating - 1
      ];
      review.avgRate[ratingKey] += 1;
    }

    review.reviews.push(reviewData); // Add the new review to the array
    return await review.save();
  } else {
    // Create a new review document
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
    return await newReview.save();
  }
}


async function listReviews(rid) {
  const reviews = await Review.find({ rid: rid });
  const recordcount = reviews.reduce(
    (acc, review) => acc + review.reviews.length,
    0
  );
  return { recordcount: recordcount, rows: reviews };
}

async function deleteReview(uid, reviewId) {
  const review = await Review.findOne({ reviewId: reviewId });
  if (!review) {
    throw new Error("Review not found");
  }

  const reviewIndex = review.reviews.findIndex((r) => r.uid === uid);
  if (reviewIndex === -1) {
    throw new Error("Review not found for the given user");
  }

  // Remove the review and update the ratings
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
