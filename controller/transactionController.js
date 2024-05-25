const transactionService = require("../services/transactionService");

async function addTransaction(req, res) {
  const { uid, cardId, orderId, amount } = req.body;
  try {
    const transaction = await transactionService.addTransaction(
      uid,
      cardId,
      orderId,
      amount
    );
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ result_code: -1, result_msg: error.message });
  }
}

async function listTransaction(req, res) {
  const { uid, rid, sort } = req.body;
  if (!(uid || rid)) {
    return res.status(400).json({ result_code: -1, result_msg: error.message });
  }

  try {
    const { transactions, totalAmount } =
      await transactionService.listTransactions(uid, rid, sort);
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
      data: {
        recordcount: transactions.length,
        total: totalAmount,
        rows: transactions,
      },
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function deleteTransaction(req, res) {
  const { uid, rid, transactionId } = req.body;
  if (!(uid || rid)) {
    return res.status(400).json({ result_code: -1, result_msg: error.message });
  }

  if (!transactionId) {
    return res.status(400).json({ result_code: -1, result_msg: error.message });
  }

  try {
    const deletedTransaction = await transactionService.deleteTransaction(
      uid,
      rid,
      transactionId
    );
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
      data: deletedTransaction,
    });
  } catch (error) {
    res.status(400).json({ result_code: -1, result_msg: error.message });
  }
}

async function getTransaction(req, res) {
  const { transactionId } = req.body;
  try {
    const transaction = await transactionService.getTransaction(transactionId);
    if (!transaction) {
      return res
        .status(404)
        .json({ result_code: -3, result_msg: error.message });
    }
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
      data: {
        recordcount: transaction.length,
        rows: transaction,
      },
    });
  } catch (error) {
    res.status(400).json({ result_code: -1, result_msg: error.message });
  }
}

module.exports = {
  addTransaction,
  listTransaction,
  deleteTransaction,
  getTransaction,
};
