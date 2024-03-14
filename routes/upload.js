const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadController = require("../controller/uploadController");

const upload = multer({ dest: "uploads/" });

router.post("/file", upload.array("files", 5), uploadController.uploadFiles);

module.exports = router;
