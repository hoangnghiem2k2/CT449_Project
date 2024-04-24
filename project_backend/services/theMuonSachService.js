const TheMuonSach = require('../models/TheMuonSach');

async function createTheMuonSach(data) {
    const { maDocGia, maSach } = data;
    try {
        const existingRecords = await TheMuonSach.find({ maDocGia, maSach });
    
        if (existingRecords.some((record) => !record.tinhTrang)) {
          return res
            .status(400)
            .json({ message: "Một hoặc nhiều dữ liệu đã tồn tại và đã được trả." });
        }
    
        const newTGMS = new TheMuonSach(data);
        const savedTGMS = await newTGMS.save();
        res.status(200).json(savedTGMS);
      } catch (err) {
        res.status(500).json(err);
      }
}



module.exports = {
    createTheMuonSach,
   
};
