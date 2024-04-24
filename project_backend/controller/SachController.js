const sachService = require('../services/sachService');
const Sach = require('../models/Sach')

async function createSach(req, res) {
    const newSach = new Sach(req.body);
    try {
      const savedSach = await newSach.save();
      res.status(200).json(savedSach);
    } catch (err) {
      res.status(500).json(err);
    }
}

async function getAllSach(req, res) {
    try {
        const sachs = await sachService.getAllSach();
        res.json(sachs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getSachById(req, res) {
    try {
        const sach = await sachService.getSachById(req.params.id);
        res.json(sach);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateSachById(req, res) {
    try {
        const updateSach = await Sach.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updateSach);
      } catch (err) {
        res.status(500).json(err);
      }
}

async function deleteSachById(req, res) {
    try {
        const result = await sachService.deleteSachById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createSach,
    getAllSach,
    getSachById,
    updateSachById,
    deleteSachById
};
