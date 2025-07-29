const Quotes = require("../models/Quotes")
const Author = require("../models/Authors")
const router = require("express").Router()

router.get("/new",async(req,res)=>{
    const allAuthors = await Author.find()
    res.render("quotes/new.ejs",{allAuthors: allAuthors})
})









module.exports = router