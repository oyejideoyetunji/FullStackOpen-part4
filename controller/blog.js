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
    } catch(error){
        next(error)
    }
})

blogRouter.get("/:id", async (request, response, next) => {
    const id = request.params.id

    try {
        const blog = await Blog.findById(id)
        if(blog){
            response.status(200).json(blog)
        }else {
            response.status(404).json({ message: "content not found" })
        }
    } catch (error) {
        next(error)
    }
})

blogRouter.delete("/:id", async (request, response, next) => {
    const id = request.params.id

    try {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogRouter.put("/:id", async (request, response, next) => {
    const id = request.params.id
    const updatedData = request.body

    try{
        const result = await Blog.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true, context: "query" })
        if(result){
            response.status(201).json(result)
        } else {
            response.status(404).json({ message: "Data not found" })
        }
    } catch(error){
        next(error)
    }
})

blogRouter.post("/", async (request, response, next) => {
    const formatedBody = {
        ...request.body,
        "likes": request.body.likes ? request.body.likes : 0
    }
    const blog = new Blog(formatedBody)

    try {
        const result = await blog.save()
        if(result){
            response.status(201).json(result)
        }else {
            response.status(500).json({ message: "an error ocurred from the server" })
        }
    } catch(error){
        next(error)
    }
})


module.exports = blogRouter
