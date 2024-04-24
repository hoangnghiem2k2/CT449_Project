const NXB = require('../models/NXB');

async function createNXB(data) {
    try {
        const nxb = new NXB(data);
        const newNXB = await nxb.save();
        return newNXB;
    } catch (error) {
        throw new Error(`Failed to create NXB: ${error.message}`);
    }
}

async function getAllNXB() {
    try {
        return await NXB.find();
    } catch (error) {
        throw new Error(`Failed to get all NXB: ${error.message}`);
    }
}

async function getNXBById(id) {
    try {
        const nxb = await NXB.findById(id);
        if (!nxb) {
            throw new Error('NXB not found');
        }
        return nxb;
    } catch (error) {
        throw new Error(`Failed to get NXB by ID: ${error.message}`);
    }
}

async function updateNXBById(id, data) {
    try {
        const updatedNXB = await NXB.findByIdAndUpdate(id,{$set:data} , { new: true });
        if (!updatedNXB) {
            throw new Error('NXB not found');
        }
        return updatedNXB;
    } catch (error) {
        throw new Error(`Failed to update NXB by ID: ${error.message}`);
    }
}

async function deleteNXBById(id) {
    try {
        const deletedNXB = await NXB.findByIdAndDelete(id);
        if (!deletedNXB) {
            throw new Error('NXB not found');
        }
        return { message: 'NXB deleted successfully' };
    } catch (error) {
        throw new Error(`Failed to delete NXB by ID: ${error.message}`);
    }
}

module.exports = {
    createNXB,
    getAllNXB,
    getNXBById,
    updateNXBById,
    deleteNXBById
};
