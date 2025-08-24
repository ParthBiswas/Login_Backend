const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const userModel = require('../model/user.model')
const {registerController,loginController,userController} = require('../controllers/auth.controllers')

router.get('/',(req,res)=>{
    res.status(200).json({
        Message:"Get It"
    })
})

router.post('/register',registerController)

router.post('/login',loginController)

router.get('/user',userController)

module.exports = router;