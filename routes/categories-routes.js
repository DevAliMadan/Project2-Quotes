const Category = require("../models/Categories")
const router = require("express").Router()


router.get("/new",(req,res)=>{
    res.render("category/new.ejs")
})

router.post("/",async(req,res)=>{
    try{
        const createdCategory = await Category.create(req.body)
        res.redirect("/category/new")
    }
    catch(error){
        console.log(error)
    }
})



module.exports = router