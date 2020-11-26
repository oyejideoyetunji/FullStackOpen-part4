const Blog = require("../model/blog")
const blogRouter = require("express").Router()



blogRouter.get("/", (request, response, next) => {
    Blog.find({}).then(blogs => {
        if(blogs){
            response.status(200).json(blogs)
        }else {
            response.status(404).json({ message: "content not found" })
        }
    }).catch(error => next(error))
})

blogRouter.post("/", (request, response, next) => {
    const blog = new Blog(request.body)

    blog.save().then(result => {
        if(result){
            response.status(201).json(result)
        }else {
            response.status(500).json({ message: "an error ocurred on the server" })
        }
    }).catch(error => next(error))
})


module.exports = blogRouter
