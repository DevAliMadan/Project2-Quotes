const {model, Schema} = require("mongoose")

const reasonSchema = new Schema({
    creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
    },
    content: {
        type: String,
        required: true
    }
})// },{timeseries:true})


const quotesSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    authors: {
        type: Schema.Types.ObjectId,
        ref: "Authors"
    },
    reason: [reasonSchema],
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Quotes = model("Quotes", quotesSchema)

module.exports = Quotes