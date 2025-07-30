const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const morgan = require("morgan")
const methodOverride = require("method-override")
const connectToDB = require("./config/db")
const categoriesRoutes = require("./routes/categories-routes")
const authRoutes = require("./routes/auth-routes")
const quoteRoutes = require("./routes/Quotes-routes")
const  session = require("express-session")
const isSignedIn = require("./middleware/isSignedIn")
const passUserToView = require("./middleware/passUserToView")





app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))
app.use (methodOverride("_method"))
app.use(morgan("dev"))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)
app.use(passUserToView)
app.set("view engine", "ejs")

connectToDB()




app.use("/category", categoriesRoutes)
app.use("/auth", authRoutes)
app.use(isSignedIn)
app.use("/quotes", quoteRoutes)


const port = process.env.PORT || 3000

const server = app.listen(port,()=>{
    console.log("Listening to port" + port)
})


server.on("error", (err) =>{
    if(err.code === "EADDRINUSE"){
        console.error(`post ${port} is already in use.`)
    }else{
        console.error(" Server error:", err.message)
    }
})