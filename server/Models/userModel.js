const {mongoose} = require("mongoose");

const userSchema = new mongoose.Schema(

    {
        name : {} ,
        email : {} , 
    } , 
    {
        timestamps : true
    }

)

module.exports = mongoose.model('User' , userSchema)