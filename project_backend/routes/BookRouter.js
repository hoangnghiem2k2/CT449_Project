const express = require("express");
const router = express.Router()
const SachController = require('../controller/SachController');
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin} = require("../middleware/authMidleware");

router.post('/add-newbook', verifyTokenAndAdmin, SachController.createSach)
router.put('/update-book/:id',verifyTokenAndAdmin, SachController.updateSachById)
router.delete('/delete-book/:id',verifyTokenAndAdmin, SachController.deleteSachById)
router.get('/',  SachController.getAllSach)
router.get('/get-details/:id', SachController.getSachById)


module.exports = router