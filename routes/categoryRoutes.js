const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post("/add", categoryController.addCategory);
router.post("/delete", categoryController.deleteCategory);
router.post("/list", categoryController.listCategories);

module.exports = router;
