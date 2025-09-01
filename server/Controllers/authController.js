const expressAsyncHandler = require("express-async-handler")
const User = require("../Models/userModel")
const jwt = require("jsonwebtoken")

const registerUser = expressAsyncHandler(async(req , res) => {
    
    const {name , email} = req.body

    if(!name || !email){
        res.status(400)
        throw new Error("Please fill all the details")
    }

    let user = await User.findOne({email})

    if(user) {
        res.status(200)
        res.json({
            name : user.name ,
            email : user.email , 
            id : user._id , 
            token : generateToken(user._id) 
        })
    }
    else{
        user = await User.create({name , email})
        if(!user){
            res.status(400)
            throw new Error ("Error in creating user")
        }

        res.status(200)
        res.json({
            name : user.name ,
            email : user.email , 
            id : user._id , 
            token : generateToken(user._id)
        })
    }
}
)

const generateToken = (id) => {
   return jwt.sign({id : id} , process.env.JWT_SECRET , {expiresIn : "30d"})
}

module.exports = {registerUser}