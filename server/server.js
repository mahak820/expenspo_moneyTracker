const express = require("express")
require("dotenv").config()

const cors = require("cors")
const colors = require("colors")
const connectDb = require("./db_config/db_config")
const errorHandler = require("./Middlewares/errorHandler")

const PORT = process.env.PORT || 3000
const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

//db connection
connectDb()

//Default Routes
app.get("/" , (req , res) => {

    res.json({
        msg : "Expense Tracker API is live"
    })

})

//Auth routes
app.use("/api/auth" , require("./Routes/authRoutes"))

//Income Routes
app.use("/api/income" , require("./Routes/incomeRoutes") )

//Expense Routes
app.use("/api/expense" , require("./Routes/expenseRoutes") )

//Fincance Routes 
app.use("/api/finance" , require("./Routes/financeRoutes") )

//AI ROutes
app.use("/api/ai", require("./Routes/aiRoutes"));



//Error handler
app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`Server is running at port : ${PORT}`.bgCyan)
})
