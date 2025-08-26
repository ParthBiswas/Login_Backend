const userModel= require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req,res){
    

const {name,email,username,password} = req.body;

    const existuser = await userModel.findOne({
        username
    })

    const existemail = await userModel.findOne({
        email
    })

    if(existuser){
        return res.status(401).json({
            Message:"useranme already register"
        })
    }

    if(existemail){
        return res.status(401).json({
            Message:"Mail-Id already register"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await userModel.create({
        name,email,username,password: hashedPassword
    })

    const token = jwt.sign({
        username:user.username
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        Message:"Registration Success",
        user
    })

}

async function loginController(req,res){
    const {username,password} = req.body;

    const user = await userModel.findOne({
        username:username

    })

    if(!user){
        return res.status(401).json({
            Message:"Unauthorized User"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    const token = jwt.sign(
  { username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }  // optional expiry
 );



   res.status(200).json({
    Message: "Logged In",
    token
   });
}

async function userController(req,res){
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            Message:"In-Valid Token"
        })
    }

    try{

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({
            username:decode.username
        }).select('-password -__v -email')

        res.status(201).json({
            Message:"Authorized",
            user
        })
    }catch{
        res.status(401).json({
            Message:"Un-Authorized"
        })
    }
}


module.exports = {
    registerController,
    loginController,
    userController
}