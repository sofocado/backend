const File = require("../model/File");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

async function uploadFiles(req, res) {
  try {
    const filesInfo = [];
    for (const file of req.files) {
      const fileExtension = "." + file.mimetype.split("/")[1]; 
      const newFilename = `${uuidv4()}${fileExtension}`;
      const oldPath = path.join(file.destination, file.filename);
      const newPath = path.join(file.destination, newFilename);
      fs.renameSync(oldPath, newPath);

      const newFile = new File({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        destination: file.destination,
        filename: newFilename,
        path: newPath,
      });

      const savedFile = await newFile.save();
      filesInfo.push(savedFile);
    }

    res.json({ message: "Upload", files: filesInfo });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload files" });
  }
}

module.exports = { uploadFiles };
