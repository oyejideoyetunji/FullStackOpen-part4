const Blog = require("../model/blog")
const User = require("../model/user")
const jwt = require("jsonwebtoken")
const blogRouter = require("express").Router()



blogRouter.get("/", async (request, response, next) => {

    try {
        const blogs = await Blog
            .find({})
            .populate("user", { name: 1, username: 1 })
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
        const blog = await Blog
            .findById(id)
            .populate("user", { name: 1, username: 1 })
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
        const decodedToken = jwt.verify(request.token, process.env.SECRETE)
        if (!(request.token && decodedToken.id)) {
            return response.status(401).json({ message: "invalid or missing token" })
        }

        const blog = await Blog.findById(id)
        if (blog.user.toString() === decodedToken.id.toString()){
            await Blog.findByIdAndRemove(id)
            response.status(204).end()
        }else{
            return response.status(401).json({ message: "invalid or missing token" })
        }
    } catch (error) {
        next(error)
    }
})

blogRouter.put("/:id", async (request, response, next) => {

    try{
        const id = request.params.id
        const updatedData = request.body
        const result = await Blog
            .findByIdAndUpdate(id, updatedData, { new: true, runValidators: true, context: "query" })
            .populate("user", { name: 1, username: 1 })

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
        const blogData = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRETE)

        if(request.token && decodedToken.id){
            const user = await User.findById(decodedToken.id)
            if(user){
                const blog = new Blog({
                    ...blogData,
                    "likes": blogData.likes ? blogData.likes : 0,
                    user: user._id
                })
                const newBlog = await blog.save()

                if (newBlog) {
                    const blogWithUserData = await Blog.findById(newBlog._id).populate("user", { name: 1, username: 1 })
                    if(blogWithUserData){
                        response.status(201).json(blogWithUserData)
                    }
                    user.blogs = user.blogs.concat(newBlog._id)
                    await user.save()
                } else {
                    response.status(500).json({ message: "an error ocurred on the server" })
                }
            }else{
                response.status(400).json({ message: "invalid token" })
            }
        }else {
            response.status(401).json({ message: "missing or invalid token" })
        }
    } catch(error){
        next(error)
    }
})


module.exports = blogRouter
