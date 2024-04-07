const Menu = require("../model/Menu");

async function addMenu(data) {
  const savedMenu = await new Menu(data).save();
  return savedMenu;
}

async function listMenus(rid, filter) {
  let query = { rid: rid };
  if (filter) {
    if (filter.keyWord) {
      query.name = { $regex: filter.keyWord, $options: "i" };
    }
    if (filter.categoryName) {
      query.category = filter.categoryName;
    }
  }
  const menus = await Menu.find(query);
  return menus;
}


async function getMenu(menuId) {
  const menu = await Menu.findOne({ menuId: menuId });
  if (!menu) {
    throw new Error("Menu not found");
  }
  return menu;
}

async function updateMenu(menuId, data) {
  const updatedMenu = await Menu.findOneAndUpdate({ menuId: menuId }, data, {
    new: true,
  });
  if (!updatedMenu) {
    throw new Error("Menu not found");
  }
  return updatedMenu;
}

async function deleteMenu(menuId) {
  await Menu.deleteOne({ menuId: menuId });
}

module.exports = {
  addMenu,
  listMenus,
  getMenu,
  updateMenu,
  deleteMenu,
};
