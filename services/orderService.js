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

async function addOrder(uid, menuItems, quantities, rid) {
  try {
    if (menuItems.length !== quantities.length) {
      throw new Error(
        "Menu items and quantities arrays must be of the same length"
      );
    }
    let total = 0;
    for (let i = 0; i < menuItems.length; i++) {
      const menuId = menuItems[i];
      const quantity = quantities[i];
      const menu = await Menu.findOne({ menuId });
      if (!menu) {
        throw new Error(`Menu item ${menuId} not found`);
      }
      total += menu.price * quantity;
    }
    const order = new Order({
      uid,
      menu: menuItems,
      quantity: quantities,
      total,
      rid,
    });
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

    const ordersWithMenuData = await Promise.all(
      orders.map(async (order) => {
        const menuData = await Promise.all(
          order.menu.map(async (menuId) => {
            const menu = await Menu.findOne({ menuId });
            if (!menu) {
              throw new Error(`Menu item ${menuId} not found`);
            }
            return {
              menuId: menu.menuId,
              name: menu.name,
              ingredient: menu.ingredient,
              category: menu.category,
              path: menu.path,
              price: menu.price,
            };
          })
        );
        return {
          ...order.toObject(),
          menu: menuData,
        };
      })
    );

    return ordersWithMenuData;
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
