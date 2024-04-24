const mongoose = require('mongoose');

const nxbSchema = new mongoose.Schema({
  tenNXB: { type: String, required: true }, 
  diaChi: { type: String, required: true }, 
});

module.exports = mongoose.model('nxb', nxbSchema);
