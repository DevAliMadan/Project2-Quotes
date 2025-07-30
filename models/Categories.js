const {model, Schema} = require("mongoose")

const categorySchema = new Schema({
    name:{
        type:String
    }
})

const Category = model("Category",categorySchema)

module.exports = Category