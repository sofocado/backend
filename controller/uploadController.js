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
        fid: uuidv4(),
      });

      const savedFile = await newFile.save();
      filesInfo.push(savedFile);
    }

    res.json({ result_code: 0, result_msg: "Upload", files: filesInfo });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

// New function to update a file
async function updateFile(req, res) {
  try {
    const { fid } = req.params;
    const fileToUpdate = await File.findOne({ fid });

    if (!fileToUpdate) {
      return res
        .status(404)
        .json({ result_code: -3, result_msg: "File not found" });
    }

    // Update the file on the server
    const file = req.file;
    const fileExtension = "." + file.mimetype.split("/")[1];
    const newFilename = `${uuidv4()}${fileExtension}`;
    const oldPath = path.join(file.destination, file.filename);
    const newPath = path.join(file.destination, newFilename);
    fs.renameSync(oldPath, newPath);

    // Update the file information in the database
    fileToUpdate.originalname = file.originalname;
    fileToUpdate.mimetype = file.mimetype;
    fileToUpdate.size = file.size;
    fileToUpdate.filename = newFilename;
    fileToUpdate.path = newPath;
    await fileToUpdate.save();

    res.json({ result_code: 0, result_msg: "File updated", file: fileToUpdate });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

module.exports = { uploadFiles, updateFile };
