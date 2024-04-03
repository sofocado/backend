const menuService = require("../services/menuService");

async function addMenu(req, res) {
  try {
    const menu = await menuService.addMenu(req.body);
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: menu });
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

async function listMenus(req, res) {
  try {
    const { rid } = req.body;
    const menus = await menuService.listMenus(rid); 
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: { rows: menus } });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function getMenu(req, res) {
  try {
    const { menuId } = req.body;
    const menu = await menuService.getMenu(menuId);
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: menu });
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

async function updateMenu(req, res) {
  try {
    const { menuId, ...updatedData } = req.body;
    const updatedMenu = await menuService.updateMenu(menuId, updatedData);
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: updatedMenu });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function deleteMenu(req, res) {
  try {
    const { menuId } = req.body;
    await menuService.deleteMenu(menuId);
    res.status(200).json({ result_msg: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

module.exports = {
  addMenu,
  listMenus,
  getMenu,
  updateMenu,
  deleteMenu,
};
