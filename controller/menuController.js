const menuService = require("../services/menuService");

async function addMenu(req, res) {
  try {
    const menu = await menuService.addMenu(req.body);
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

async function listMenus(req, res) {
  try {
    const menus = await menuService.listMenus();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function updateMenu(req, res) {
  try {
    const { menuId, ...updatedData } = req.body;
    const updatedMenu = await menuService.updateMenu(menuId, updatedData);
    res.json(updatedMenu);
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function deleteMenu(req, res) {
  try {
    const menuId = req.body.menuId;
    await menuService.deleteMenu(menuId);
    res.json({ result_msg: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

module.exports = {
  addMenu,
  listMenus,
  updateMenu,
  deleteMenu,
};
