const express = require("express");
const router = express.Router()
const NXBController = require('../controller/NXBController');

router.post('/add-NXB', NXBController.createNXB)
router.put('/update-NXB/:id', NXBController.updateNXBById)
router.delete('/delete-NXB/:id', NXBController.deleteNXBById)
router.get('/',  NXBController.getAllNXB)
router.get('/get-details/:id', NXBController.getNXBById)


module.exports = router