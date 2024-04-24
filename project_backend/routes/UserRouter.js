const express = require("express");
const router = express.Router()
const userController = require('../controller/UserController');
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin} = require("../middleware/authMidleware");

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.put('/update-user/:id', verifyTokenAndAdmin, userController.updateUser)
router.delete('/delete-user/:id', verifyTokenAndAdmin, userController.deleteUser)
router.get('/getAll',verifyTokenAndAdmin,  userController.getAllUser)
router.get('/get-details/:id', userController.getDetailsUser)

module.exports = router