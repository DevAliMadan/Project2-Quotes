const Quotes = require("../models/Quotes")
const Category = require("../models/Categories")
const router = require("express").Router()

router.get("/new",async(req,res)=>{
    const allCategories = await Category.find()
    res.render("quotes/new.ejs",{allCategories: allCategories})
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

router.get("/:quoteId", async(req,res)=>{
    try{
        const quoteDetails = await Quotes.findById(req.params.quoteId)
        console.log(quoteDetails)
        res.render("quotes/quotes-details.ejs",{quoteDetails})
    }
    catch(error){
        console.log(error)
    }
})



module.exports = router