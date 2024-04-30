const cardService = require("../services/cardService");

async function addCard(req, res) {
  try {
    const { uid, cardNumber, validthru, cvv, fullname } = req.body;
    const card = await cardService.addCard({ uid, cardNumber, validthru, cvv, fullname });
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: card });
  } catch (error) {
    res.status(400).json({ result_code: -1, result_msg: error.message });
  }
}

async function getCard(req, res) {
  try {
    const { uid, cardId } = req.body;
    const card = await cardService.getCard({ uid, cardId });
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: card });
  } catch (error) {
    res.status(400).json({ result_code: -1, result_msg: error.message });
  }
}

async function deleteCard(req, res) {
  try {
    const { uid, cardId } = req.body;
    await cardService.deleteCard({ uid, cardId });
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

module.exports = {
  addCard,
  getCard,
  deleteCard,
};
