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
    }
]

async function initializeDB(){
    await Blog.deleteMany({}).catch(error => { logger.error(error) })
    const newBlog = Blog(initialBlogs[0])
    await newBlog.save().catch(error => { logger.error(error) })
}

function getAllBlogs(){
    return api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .catch(err => logger.error(err))
}

function addABlog(newBlog){
    return api.post("/api/blogs")
        .send(newBlog)
}

module.exports = { api, initialBlogs, initializeDB, getAllBlogs, addABlog }

afterAll(() => {
    mongoose.connection.close()
})

