const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const blogSchema = mongoose.Schema({
    title:  { type: String, minlength: 8, required: true, unique: true },
    author: { type: String, minlength: 8, required: true, unique: true },
    url:    { type: String, minlength: 8, required: true, unique: true },
    likes:  { type: Number, min: 0, required: true, unique: true, }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Blog", blogSchema)
