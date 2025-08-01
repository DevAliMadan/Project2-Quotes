const Quotes = require("../models/Quotes")
const Category = require("../models/Categories")
const router = require("express").Router()

router.get("/new",async(req,res)=>{
   try{
    const allCategories = await Category.find()
    res.render("quotes/new.ejs",{allCategories: allCategories})
   }
   catch(error){
    console.log(error)
   }
})


router.post("/",async(req,res)=>{
    console.log(req.body)
    try{
        req.body.creator = req.session._id
        await Quotes.create(req.body)
        res.redirect("/quotes/new") 
    }
    catch(error){
        console.log(error)
    }
})

router.get("/all-quotes",async(req,res)=>{
    try{
        const allQuotes = await Quotes.find().populate("category")
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

router.post("/:quoteId/reason", async(req,res)=>{
    try{
        const quoteDetails = await Quotes.findById(req.params.quoteId)
        console.log(quoteDetails)
        quoteDetails.reason.push(req.body)
        quoteDetails.save()
        res.redirect(`quotes/${quoteDetails._id}`)
    }
    catch(error){
        console.log(error)
    }
})


router.delete("/:quoteId", async(req,res)=>{
    console.log(req.params)
    try{
        await Quotes.findByIdAndDelete(req.params.quoteId)
        res.redirect("quotes/all-quotes")
    }
    catch(error){
        console.log(error)
    }
})

router.get("/:id/update", async(req,res)=>{
    try{
        const quoteDetails = await Quotes.findByIdAndUpdate(req.params.id)
        res.render("quotes/update-quote.ejs")
    }
    catch(error){
        console.log(error)
    }
})


module.exports = router