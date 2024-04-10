const express = require("express");
const router = express.Router();
const menuCategoryController = require("../controller/menuCategoryController");

router.post("/add", menuCategoryController.addMenuCategory);
router.post("/delete", menuCategoryController.deleteMenuCategory);
router.post("/list", menuCategoryController.listMenuCategories);

module.exports = router;
