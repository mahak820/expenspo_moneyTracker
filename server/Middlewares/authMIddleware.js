const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const User = require("../Models/userModel")


const protect = expressAsyncHandler(async(req , res , next) => {

    let token
    try {
        if(req.headers && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token , process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id)

            next()
        }
        else{
            res.status(401)
            throw new Error ("Invalid Request : Token is invalid")
        }
    } catch (error) {
        res.status(401)
        throw new Error ("Invalid Request : Token is invalid " , error)
    }

})

module.exports = protect