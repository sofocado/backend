const orderService = require("../services/orderService");

async function addOrder(req, res) {
  try {
    const { uid, menu, quantity, rid } = req.body;
    const order = await orderService.addOrder(uid, menu, quantity, rid);
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: order });
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

async function listOrders(req, res) {
  try {
    const { uid, rid } = req.body;
    const orders = await orderService.listOrders(uid, rid);
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function deleteOrder(req, res) {
  try {
    const orderId = req.body.orderId;
    await orderService.deleteOrder(orderId);
    res.status(200).json({ result_code: 0, result_msg: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function getOrder(req, res) {
  try {
    const { uid, rid, orderId } = req.body;
    const order = await orderService.getOrder(uid, rid, orderId);
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: order });
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

module.exports = {
  addOrder,
  listOrders,
  deleteOrder,
  getOrder,
};
