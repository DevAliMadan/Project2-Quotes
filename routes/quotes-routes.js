const Quotes = require("../models/Quotes")
const Author = require("../models/Authors")
const router = require("express").Router()

router.get("/new",async(req,res)=>{
    const allAuthors = await Author.find()
    res.render("quotes/new.ejs",{allAuthors: allAuthors})
})


router.post("/",async(req,res)=>{
    try{
        req.body.creator = req.session._id
        await Quotes.create(req.body)
        res.redirect("/quotes/new")
    }
    catch(error){
        console.log(error)
    }
})

router.get("/",async(req,res)=>{
    try{
        const allQuotes = await Quotes.find().populate("author")
        console.log(req.session)
        res.render("quotes/all-quotes.ejs", {allQuotes, user:req.session.user})
    }
    catch(error){
        console.log(error)
    }
})




module.exports = router