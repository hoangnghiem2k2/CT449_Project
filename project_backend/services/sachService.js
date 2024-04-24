const Sach = require('../models/Sach');

async function createSach(data) {
    try {
        const sach = new Sach(data);
        const newSach = await sach.save();
        return newSach;
    } catch (error) {
        throw new Error(`Failed to create Sach: ${error.message}`);
    }
}

async function getAllSach() {
    try {
        return await Sach.find();
    } catch (error) {
        throw new Error(`Failed to get all Sach: ${error.message}`);
    }
}

async function getSachById(id) {
    try {
        const sach = await Sach.findById(id);
        if (!sach) {
            throw new Error('Sach not found');
        }
        return sach;
    } catch (error) {
        throw new Error(`Failed to get Sach by ID: ${error.message}`);
    }
}

async function updateSachById(id, data) {
    try {
        const updatedSach = await Sach.findByIdAndUpdate(id, {$set: data}, { new: true });
        if (!updatedSach) {
            throw new Error('Sach not found');
        }
        return updatedSach;
    } catch (error) {
        throw new Error(`Failed to update Sach by ID: ${error.message}`);
    }
}

async function deleteSachById(id) {
    try {
        const deletedSach = await Sach.findByIdAndDelete(id);
        if (!deletedSach) {
            throw new Error('Sach not found');
        }
        return { message: 'Sach deleted successfully' };
    } catch (error) {
        throw new Error(`Failed to delete Sach by ID: ${error.message}`);
    }
}

module.exports = {
    createSach,
    getAllSach,
    getSachById,
    updateSachById,
    deleteSachById
};
