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
    res.status(400).json({ error: error.message });
  }
}

async function listTransaction(req, res) {
  const { uid, rid, sort } = req.body;
  if (!(uid || rid)) {
    return res
      .status(400)
      .json({ error: "Either uid or rid must be provided" });
  }

  try {
    const transactions = await transactionService.listTransactions(
      uid,
      rid,
      sort
    );
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
      data: { recordcount: transactions.length, rows: transactions },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTransaction(req, res) {
  const { uid, rid, transactionId } = req.body;
  if (!(uid || rid)) {
    return res
      .status(400)
      .json({ error: "Either uid or rid must be provided" });
  }

  if (!transactionId) {
    return res.status(400).json({ error: "TransactionId is required" });
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
    res.status(400).json({ error: error.message });
  }
}

async function getTransaction(req, res) {
  const { transactionId } = req.body;
  try {
    const transaction = await transactionService.getTransaction(transactionId);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  addTransaction,
  listTransaction,
  deleteTransaction,
  getTransaction,
};
