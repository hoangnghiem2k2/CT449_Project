const theMuonSachService = require('../services/theMuonSachService');
const TheMuonSach = require('../models/TheMuonSach')
const Sach = require('../models/Sach')
const mongoose = require("mongoose");

async function createTheMuonSach(req, res) {
  const { maDocGia, maSach } = req.body;

  try {
    const existingRecords = await TheMuonSach.find({ maDocGia, maSach });

    if (existingRecords.some((record) => !record.tinhTrang)) {
      return res
        .status(400)
        .json({ message: "Một hoặc nhiều dữ liệu đã tồn tại và đã được trả." });
    }

    const newTGMS = new TheMuonSach(req.body);
    const savedTGMS = await newTGMS.save();
    res.status(200).json(savedTGMS);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getAllTheMuonSach(req, res) {
    try {
        const unreturnedRecords = await TheMuonSach.find()
          .populate({ path: "maSach", select: "tenSach" })
          .populate({ path: "maDocGia", select: "email" });
        const extendedRecords = unreturnedRecords.map((record) => ({
          _id: record._id,
          maDocGia: record.maDocGia,
          maSach: record.maSach,
          tinhTrang: record.tinhTrang,
          trangThaiMuon: record.trangThaiMuon,
          ngayMuon: record.ngayMuon,
          ngayTra: record.ngayTra,
        }));
    
        res.status(200).json(extendedRecords);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

async function getTheMuonSachById(req, res) {
    try {
        const sachId =  new mongoose.Types.ObjectId(req.params.id);
    
        const sach = await Sach.findById(sachId);
        const soQuyen = sach.soQuyen;
    
        const countMuon = await TheMuonSach.countDocuments({ maSach: sachId, tinhTrang: false});
    
        const count = soQuyen - countMuon;
    
        res.status(200).json({ count });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

async function Userthemuonsach(req, res) {
    try {
        const TheMuonSach1 = await TheMuonSach.find({
          maDocGia: req.params.id,
        }).populate("maSach", "tenSach");
        if (TheMuonSach.length === 0) {
          return res
            .status(404)
            .json({ message: "Không tìm thấy TheMuonSach cho User này." });
        }
        res.status(200).json(TheMuonSach1);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}


async function updateTheMuonSachById(req, res) {
    try {
        const updated = await TheMuonSach.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updated);
      } catch (err) {
        res.status(500).json(err);
      }
}

async function deleteTheMuonSachById(req, res) {
    try {
        await TheMuonSach.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
}


async function unReturn(req, res) {
    try {
        const unreturnedRecords = await TheMuonSach.find({ tinhTrang: false })
          .populate({ path: "maSach", select: "tenSach" })
          .populate({ path: "maDocGia", select: "username" });
        const extendedRecords = unreturnedRecords.map((record) => ({
          _id: record._id,
          maDocGia: record.maDocGia,
          maSach: record.maSach,
          tinhTrang: record.tinhTrang,
          trangThaiMuon: record.trangThaiMuon,
          ngayMuon: record.ngayMuon,
          ngayTra: record.ngayTra,
        }));
    
        res.status(200).json(extendedRecords);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

async function findTheMuonSach(req, res) { 
    try {
      const theId = req.params.id
        const The = await TheMuonSach.findById(theId)
          .populate({ path: "maSach", select: "tenSach" })
          .populate({ path: "maDocGia", select: "username" });
        res.status(200).json(The);
      } catch (err) {
        res.status(500).json(err);
      }
}


module.exports = {
    createTheMuonSach,
    getAllTheMuonSach,
    getTheMuonSachById,
    updateTheMuonSachById,
    deleteTheMuonSachById,
    Userthemuonsach,
    unReturn,
    findTheMuonSach
};
