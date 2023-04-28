const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  path: String,
  size: Number
});

const File = mongoose.model('File', fileSchema);

module.exports = File;