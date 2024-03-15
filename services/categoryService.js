const Category = require("../model/Category");

exports.addCategory = async (name) => {
  try {
    const category = new Category({ name });
    const savedCategory = await category.save();
    return {
      result_code: 0,
      result_msg: "Success!",
      data: {
        rows: savedCategory,
      },
    };
  } catch (error) {
    throw error;
  }
};

exports.deleteCategory = async (cid) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({ cid });
    return {
      result_code: 0,
      result_msg: "Success!",
      data: {
        rows: deletedCategory,
      },
    };
  } catch (error) {
    throw error;
  }
};

exports.listCategories = async () => {
  try {
    const categories = await Category.find();
    return {
      result_code: 0,
      result_msg: "Success!",
      data: {
        rows: categories,
      },
    };
  } catch (error) {
    throw error;
  }
};
