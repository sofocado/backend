const menuCategoryService = require("../services/menuCategoryService");

async function addMenuCategory(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const menuCategory = await menuCategoryService.addMenuCategory(name);
    res.status(201).json({
      result_code: 0,
      result_msg: "Success!",
      data: { rows: menuCategory },
    });
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

async function deleteMenuCategory(req, res) {
  try {
    const { mcid } = req.body;
    const menuCategory = await menuCategoryService.deleteMenuCategory(mcid);
    if (!menuCategory) {
      return res.status(404).json({ error: "Menu category not found" });
    }
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function listMenuCategories(req, res) {
  try {
    const menuCategories = await menuCategoryService.listMenuCategories();
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
      data: { recordcount: menuCategories.length, rows: menuCategories },
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

module.exports = {
  addMenuCategory,
  deleteMenuCategory,
  listMenuCategories,
};
