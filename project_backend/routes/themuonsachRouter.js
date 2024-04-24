const express = require("express");
const router = express.Router()
const TheMuonSachController = require('../controller/TheMuonSachController');
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin}   = require("../middleware/authMidleware");


router.post('/add-the', verifyToken, TheMuonSachController.createTheMuonSach)
router.get('/', TheMuonSachController.getAllTheMuonSach)
router.get('/count/:id', TheMuonSachController.getTheMuonSachById)
router.get('/user/:id', TheMuonSachController.Userthemuonsach)
router.put('/update/:id', verifyTokenAndAdmin, TheMuonSachController.updateTheMuonSachById)
router.delete('/delete/:id', verifyTokenAndAdmin, TheMuonSachController.deleteTheMuonSachById)
router.get('/book-return', TheMuonSachController.unReturn)
router.get('/find/:id', TheMuonSachController.findTheMuonSach)


module.exports = router