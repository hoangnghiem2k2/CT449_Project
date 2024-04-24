const UserService = require('../services/UserService')
const jwt = require("jsonwebtoken");
const User = require("../models/DocGia");
const bcrypt = require("bcrypt")



const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "Emjail người dùng không tồn tại." });
        
      }
      const comparePassword = bcrypt.compareSync(req.body.password, user.password)

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'Mật khẩu không chính xác'
                })
            }
      const token = jwt.sign(
        { userId: user._id,
          isAdmin: user.isAdmin},
        process.env.JWT_SEC,
        { expiresIn: "1h" }
      );  
      
      res.status(200).json({ user, token });
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình đăng nhập." });
    }
  };

const updateUser = async (req, res) => {
    if (req.body.password) {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds
          req.body.password = hashedPassword;
        } catch (error) {
          // Handle error
          return res.status(500).json({ error: 'Failed to hash password' });
        }
      }
      
      try {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateUser);
      } catch (err) {
        res.status(500).json(err);
      }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await UserService.deleteManyUser(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getAllUser = async (req, res) => {
    try { 
        const allUsers = await User.find().sort({createdAt: -1, updatedAt: -1});
        res.status(200).json(allUsers);
      } catch (err) {
        res.status(500).json(err);
      }
}

const getDetailsUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
}

const refreshToken = async (req, res) => {
    try {
        let token = req.headers.token.split(' ')[1]
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteMany
}