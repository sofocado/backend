const reviewService = require("../services/reviewService");

async function addReview(req, res) {
  try {
    const review = await reviewService.addReview(req.body);
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: review });
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

async function listReviews(req, res) {
  try {
    const { rid } = req.body;
    const reviews = await reviewService.listReviews(rid);
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
      data: { rows: reviews },
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function deleteReview(req, res) {
  try {
    const { uid, reviewId } = req.body;
    const result = await reviewService.deleteReview(uid, reviewId);
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: result });
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}


module.exports = {
  addReview,
  listReviews,
  deleteReview,
};
