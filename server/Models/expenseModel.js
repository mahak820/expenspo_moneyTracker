const {mongoose} = require("mongoose")

const expenseSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId ,
            require : true
        } ,
        title : {
            type : String ,
            require : true
        } ,
        ammount : {
            type : Number ,
            require : true
        } , 
        category : {
            type : String , 
            enum : ['food' , 'rent' , 'travel' , 'shopping' , 'entertainment' , 'others'] , 
            required : true
        } ,
        
    } ,
    {
        timestamps : true
    }
)

module.exports = mongoose.model('Expense' , expenseSchema)