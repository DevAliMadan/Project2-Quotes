const Category = require("../models/Categories")
const router = require("express").Router()


router.get("/new",(req,res)=>{
    res.render("category/new.ejs")
})

router.post("/",async(req,res)=>{
  try {
    await Category.create(req.body);
    res.redirect("/quotes/new");
  } catch (error){
    console.log(error)
  }
})



module.exports = router