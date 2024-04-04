const Category = require("../model/Category");

async function addCategory(name) {
  try {
    const category = new Category({ name });
    return await category.save();
  } catch (error) {
    throw error;
  }
};

async function deleteCategory(cid) {
  try {
    return await Category.findOneAndDelete({ cid });
  } catch (error) {
    throw error;
  }
};

async function listCategories() {
  try {
    return await Category.find();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addCategory,
  deleteCategory,
  listCategories,
};