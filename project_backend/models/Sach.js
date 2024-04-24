const mongoose = require('mongoose');

const sachSchema = new mongoose.Schema({
  tenSach: { type: String, required: true }, 
  dongia: { type: Number, required: true }, 
  namXuatBan: { type: Number, required: true }, 
  maNXB: { type: mongoose.Schema.Types.ObjectId, ref: 'nxbs' },
  soQuyen: { type: Number, required: true }, 
  img: {type : String, required: true},
  loaiSach: { type: String }, 
  tacGia: { type: String }, 
  nguoiDich: { type: String },
  ngayNhap: { type: Date }, 
  
});

module.exports = mongoose.model('sach', sachSchema);
