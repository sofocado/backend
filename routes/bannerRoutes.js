const express = require("express");
const router = express.Router();
const bannerController = require("../controller/bannerController");

router.post("/list", bannerController.list);
router.post("/add", bannerController.add);
router.post("/get", bannerController.get);
router.post("/delete", bannerController.delete);

module.exports = router;
