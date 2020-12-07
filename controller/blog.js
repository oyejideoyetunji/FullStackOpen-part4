const Blog = require("../model/blog")
const User = require("../model/user")
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

    try {
        if(request.body.userId){
            const user = await User.findById(request.body.userId)
            if(user){
                delete request.body.userId

                const blog = new Blog({
                    ...request.body,
                    "likes": request.body.likes ? request.body.likes : 0,
                    user: user._id
                })
                const newBlog = await blog.save()
                if (newBlog) {
                    user.blogs = user.blogs.concat(newBlog._id)
                    await user.save()
                    response.status(201).json(newBlog)
                } else {
                    response.status(500).json({ message: "an error ocurred on the server" })
                }
            }else{
                response.status(400).json({ message: "invalid or non-existing user id in blog data" })
            }
        }else {
            response.status(400).json({ message: "incomplete blog data" })
        }
    } catch(error){
        next(error)
    }
})


module.exports = blogRouter
