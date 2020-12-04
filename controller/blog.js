const Blog = require("../model/blog")
const blogRouter = require("express").Router()



blogRouter.get("/", async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        if(blogs){
            response.status(200).json(blogs)
        }else {
            response.status(404).json({ message: "content not found" })
        }
    } catch(error){ next(error) }
})

blogRouter.post("/", async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
        if(result){
            response.status(201).json(result)
        }else {
            response.status(500).json({ message: "an error ocurred from the server" })
        }
    } catch(error){ next(error) }
})


module.exports = blogRouter
