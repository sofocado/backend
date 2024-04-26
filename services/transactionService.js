const Transaction = require("../model/Transaction");
const Order = require("../model/Order");
const Card = require("../model/Card");

async function addTransaction(uid, cardId, orderId) {
  try {
    const order = await Order.findOne({ orderId });
    if (!order) {
      throw new Error("Order not found");
    }

    const total = order.total;
    const card = await Card.findOne({ cardId });
    if (!card) {
      throw new Error("Card not found");
    }
    if (card.account < total) {
      throw new Error("Insufficient funds");
    }
    card.account -= total;
    await card.save();

    const rid = order.rid;

    const transaction = new Transaction({
      uid,
      rid,
      cardId,
      orderId,
      amount: total,
    });
    await transaction.save();

    return transaction;
  } catch (error) {
    throw error;
  }
}

async function listTransactions(uid, rid, sort) {
  try {
    let query = {};
    if (uid) {
      query.uid = uid;
    } else if (rid) {
      query.rid = rid;
    }

    const sortOptions = {};
    sort.forEach((sortObj) => {
      sortOptions[sortObj.key] = sortObj.isAsc === 0 ? 1 : -1;
    });

    const transactions = await Transaction.find(query).sort(sortOptions);
    return transactions;
  } catch (error) {
    throw error;
  }
}


async function deleteTransaction(uid, rid, transactionId) {
  try {
    let query = { transactionId };
    if (uid) {
      query.uid = uid;
    } else if (rid) {
      query.rid = rid;
    }
    const deletedTransaction = await Transaction.findOneAndDelete(query);
    return deletedTransaction;
  } catch (error) {
    throw error;
  }
}

async function getTransaction(transactionId) {
  try {
    const transaction = await Transaction.findOne({ transactionId });
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return transaction;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTransaction,
  listTransactions,
  deleteTransaction,
  getTransaction,
};
