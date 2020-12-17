const Blog = require("../model/blog")
const User = require("../model/user")
const testRouter = require("express").Router()



testRouter.post("/reset", async(req, res, next) => {
    try{
        await Blog.deleteMany({})
        await User.deleteMany({})

        res.status(204).end()
    }catch(error){
        next(error)
    }
})

module.exports = testRouter