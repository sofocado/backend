const express = require("express");
const router = express.Router();
const bannerController = require("../controller/bannerController");

router.post("/list", bannerController.list);
router.post("/add", bannerController.add);
router.post("/get/:id", bannerController.get);
router.post("/delete/:id", bannerController.delete);

module.exports = router;
