const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const path = require('path');
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    // Check if a file with the same name already exists in the uploads directory
    let fileName = name + ext;
    let i = 1;
    while (fs.existsSync(`uploads/${fileName}`)) {
      fileName = `${name}(${i})${ext}`;
      i++;
    }

    // Call the callback function with the new filename
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// This function handles file uploads
const uploadFile = function(req, res) {
  // Use the 'upload' middleware to handle single file uploads
  upload.single('file')(req, res, function(err) {
    console.log('req.file:', req.file);
    // If there was an error uploading the file, return an error response
    if (err) {
      return res.status(400).json({ message: 'Error uploading file', error: err });
    }

    // If the file was uploaded successfully, extract its metadata
    const { filename, mimetype, path, size } = req.file;

    // Rename the uploaded file to remove any spaces
    const oldPath = path;
    const newPath = path.replace(/\s+/g, '-');
    fs.renameSync(oldPath, newPath);

    // If everything was successful, return a success response
    return res.status(201).json({ filename: filename });
  });
};

module.exports = {
  uploadFile
}