const Order = require("../model/Order");
const Menu = require("../model/Menu");

async function calculateTotal(menuId, quantity) {
  try {
    const menu = await Menu.findOne({ menuId });
    if (!menu) {
      throw new Error("Menu item not found");
    }
    const totalPrice = menu.price * quantity;
    return totalPrice;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addOrder(uid, menuId, quantity, rid) {
  try {
    const menu = await Menu.findOne({ menuId });
    if (!menu) {
      throw new Error("Menu item not found");
    }
    const total = await calculateTotal(menuId, quantity);
    const order = new Order({ uid, menuId, quantity, total, rid });
    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function listOrders(uid, rid) {
  try {
    let query = {};
    if (uid !== null && uid !== "") {
      query.uid = uid;
    }
    if (rid !== null && rid !== "") {
      query.rid = rid;
    }
    const orders = await Order.find(query);
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteOrder(orderId) {
  try {
    await Order.findOneAndDelete({ orderId });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getOrder(uid, rid, orderId) {
  try {
    let query = { orderId };
    if (uid !== null && uid !== "") {
      query.uid = uid;
    }
    if (rid !== null && rid !== "") {
      query.rid = rid;
    }
    const order = await Order.findOne(query);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  calculateTotal,
  addOrder,
  listOrders,
  deleteOrder,
  getOrder,
};
