require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const fileSchema = new mongoose.Schema({
  originalname: String,
  mimetype: String,
  size: Number,
  destination: String,
  filename: String,
  path: String,
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);

app.post("/upload", upload.array("files", 5), async (req, res) => {
  try {
    const filesInfo = [];
    for (const file of req.files) {
      const newFile = new File({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        destination: file.destination,
        filename: file.filename,
        path: file.path,
      });
      const savedFile = await newFile.save();
      filesInfo.push(savedFile);
    }

    res.json({ message: "Upload", files: filesInfo });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload files" });
  }
});

const PORT = 1111;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
