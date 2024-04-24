const nxbService = require('../services/NxbService');

async function createNXB(req, res) {
    try {
        const newNXB = await nxbService.createNXB(req.body);
        res.json(newNXB);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllNXB(req, res) {
    try {
        const nxbs = await nxbService.getAllNXB();
        res.json(nxbs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getNXBById(req, res) {
    try {
        const nxb = await nxbService.getNXBById(req.params.id);
        res.json(nxb);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateNXBById(req, res) {
    try {
        const updatedNXB = await nxbService.updateNXBById(req.params.id, req.body);
        res.json(updatedNXB);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteNXBById(req, res) {
    try {
        const result = await nxbService.deleteNXBById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createNXB,
    getAllNXB,
    getNXBById,
    updateNXBById,
    deleteNXBById
};
