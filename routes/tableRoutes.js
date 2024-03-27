const express = require("express");
const router = express.Router();
const tableController = require("../controller/tableController");

router.post("/add", tableController.addTable);
router.post("/list", tableController.listTables);
router.post("/delete", tableController.deleteTable);

module.exports = router;
