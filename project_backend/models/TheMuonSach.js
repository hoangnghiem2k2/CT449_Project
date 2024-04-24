const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema(
    {
      maDocGia: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      maSach: { type: mongoose.Schema.Types.ObjectId, ref: 'sach' },
      ngayMuon: { type: Date, default: Date.now }, 
      ngayTra: { type: Date },
      tinhTrang: {
        type: Boolean,
        default: false,
      },
      trangThaiMuon:{
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

TheoDoiMuonSachSchema.pre('save', function(next) {
  if (this.ngayMuon && !this.ngayTra) {
    const ngayTra = new Date(this.ngayMuon);
    ngayTra.setDate(ngayTra.getDate() + 30); 
    this.ngayTra = ngayTra;
  }
  next();
});

module.exports = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema);
