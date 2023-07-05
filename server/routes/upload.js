const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination directory based on the owner_id
    const destinationDir = path.join("public", "static", req.params.owner_id);
    createDirectory(destinationDir);
    cb(null, destinationDir);
  },
  filename: (req, file, cb) => {
    // Generate a random filename
    const randomFilename = generateRandomFilename(file.originalname);
    cb(null, randomFilename);
  },
});

// Create the multer upload middleware
const upload = multer({ storage: storage });

// Function to create a directory recursively if it doesn't exist
const createDirectory = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};

// Function to generate a random filename
const generateRandomFilename = (originalFilename) => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileExtension = path.extname(originalFilename);
  return `${timestamp}-${randomString}${fileExtension}`;
};

// @Path        : /post/new
// @method      : POST
// @description : Handle the POST request with the file upload
// @Access      : PUBLIC
router.post("/post/:owner_id", upload.array("files"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  // Files uploaded successfully
  const fileLocations = req.files.map(
    (file) => `upload/image/${req.params.owner_id}/${file.filename}`
  );
  return res.status(200).json({
    msg: "Files uploaded successfully",
    fileLocations: fileLocations,
  });
});

// @Path        : /upload/image/:owner_id/:filename
// @method      : GET
// @description : API endpoint to retrieve and display the image
// @Access      : PUBLIC

router.get("/image/:owner_id/:filename", (req, res) => {
  const imagePath = path.join(
    "public",
    "static",
    req.params.owner_id,
    req.params.filename
  );
  res.sendFile(path.resolve(imagePath));
});

module.exports = router;
