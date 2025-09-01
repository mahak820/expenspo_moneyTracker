
const express = require("express")
const protect = require("../Middlewares/authMIddleware")
const router = express.Router() 
const {generateAIReport, savingAdvisor, personalChat} = require("../Controllers/aiController")

router.get("/report" , protect , generateAIReport )
router.post("/saving" , protect ,   savingAdvisor);
router.post("/chat" , protect ,   personalChat);


module.exports = router