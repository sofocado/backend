const Card = require("../model/Card");

async function addCard({ uid, cardNumber, validthru, cvv }) {
  try {
    const card = new Card({ uid, cardNumber, validthru, cvv });
    return await card.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getCard({ uid, cardId }) {
  try {
    let query = {};
    if (uid) query.uid = uid;
    if (cardId) query.cardId = cardId;
    return await Card.findOne(query);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteCard({ uid, cardId }) {
  try {
    await Card.findOneAndDelete({ uid, cardId });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  addCard,
  getCard,
  deleteCard,
};
