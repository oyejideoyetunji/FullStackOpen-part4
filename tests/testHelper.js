const mongoose = require("mongoose")
const Blog = require("../model/blog")
const supertest = require("supertest")
const app = require("../app")
const logger = require("../utils/logger")


const api = supertest(app)
const initialBlogs = [
    {
        "title": "Smashing Magazine",
        "author": "John Doe",
        "url": "https://dummie@url.com",
        "likes": 8
    },
    {
        "title": "React patterns",
        "author": "Michael Chan",
        "url": "https://reactpatterns.com/",
        "likes": 7,
    }
]

async function initializeDB(){
    await Blog.deleteMany({}).catch(error => { logger.error(error) })
    for(const blog of initialBlogs){
        const blogDocument = new Blog(blog)
        await blogDocument.save()
    }
}

function getAllBlogs(){
    return api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
}

function getABlog(id){
    return api
        .get(`/api/blogs/${id}`)
}

function deleteABlog(id){
    return api
        .delete(`/api/blogs/${id}`)
}

function addABlog(newBlog){
    return api.post("/api/blogs")
        .send(newBlog)
}

async function getBlogsInDB(){
    const response = await Blog.find({})
    return response
}

async function noneExistingId(){
    const blog = new Blog({
        "title": "just to get an id",
        "author": "mr author",
        "url": "https://www.testurl.com",
        "likes": 6
    })

    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

module.exports = {
    api, initialBlogs, initializeDB, getAllBlogs, addABlog, getBlogsInDB, noneExistingId, getABlog, deleteABlog
}

afterAll(() => {
    mongoose.connection.close()
})
