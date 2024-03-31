const express = require("express");
const router = express.Router();
const menuController = require("../controller/menuController");

router.post("/add", menuController.addMenu);
router.post("/list", menuController.listMenus);
router.post("/update", menuController.updateMenu);
router.post("/delete", menuController.deleteMenu);

module.exports = router;
