const {model, Schema} = require("mongoose")

const reasonSchema = new Schema({
    creator: {
    type: String,
    required: true,
    },
    content: {
        type: String,
        required: true
    }
})


const quotesSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
         ref: "Category"
    },
    authors: {
        type: String,
        ref: "Author"
    },
    reason: [reasonSchema],
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Quotes = model("Quotes", quotesSchema)

module.exports = Quotes