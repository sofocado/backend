const categoryService = require("../services/categoryService");

async function addCategory(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await categoryService.addCategory(name);
    res.status(201).json({
      result_code: 0,
      result_msg: "Success!",
      data: { rows: category },
    });
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const { cid } = req.body;
    const category = await categoryService.deleteCategory(cid);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function listCategories(req, res) {
  try {
    const categories = await categoryService.listCategories();
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
      data: { recordcount: categories.length, rows: categories },
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

module.exports = {
  addCategory,
  deleteCategory,
  listCategories,
};
