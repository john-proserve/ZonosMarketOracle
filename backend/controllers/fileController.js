const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

const uploadFile = function(req, res) {
  upload.single('file')(req, res, function(err) {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file', error: err });
    }

    const { filename, mimetype, path, size } = req.file;

    // Rename the uploaded file to remove any spaces
    const oldPath = path;
    const newPath = path.replace(/\s+/g, '-');
    fs.renameSync(oldPath, newPath);

    return res.status(201).json({ message: 'File uploaded successfully' });
  });
};

module.exports = {
  uploadFile
}