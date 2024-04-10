const MenuCategory = require("../model/menuCategory");

async function addMenuCategory(name) {
  try {
    const menuCategory = new MenuCategory({ name });
    return await menuCategory.save();
  } catch (error) {
    throw error;
  }
}

async function deleteMenuCategory(mcid) {
  try {
    return await MenuCategory.findOneAndDelete({ mcid });
  } catch (error) {
    throw error;
  }
}

async function listMenuCategories() {
  try {
    return await MenuCategory.find();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addMenuCategory,
  deleteMenuCategory,
  listMenuCategories,
};
