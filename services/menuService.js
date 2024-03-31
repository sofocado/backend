const Menu = require("../model/Menu");

async function addMenu(data) {
  try {
    const savedMenu = await new Menu(data).save();
    return {
      result_code: 0,
      result_msg: "Success!",
      data: savedMenu,
    };
  } catch (error) {
    throw error;
  }
}

async function listMenus() {
  try {
    const menus = await Menu.find({});
    return {
      result_code: 0,
      result_msg: "Success!",
      data: {
        rows: menus,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function updateMenu(menuId, data) {
  try {
    const menu = await Menu.findOne({ menuId: menuId });
    if (!menu) {
      throw new Error("Menu not found");
    }
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        menu[key] = data[key];
      }
    }
    await menu.save();

    return {
      result_code: 0,
      result_msg: "Success!",
      data: menu,
    };
  } catch (error) {
    throw error;
  }
}

async function deleteMenu(menuId) {
  try {
    await Menu.deleteOne({ menuId: menuId });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addMenu,
  listMenus,
  updateMenu,
  deleteMenu,
};
