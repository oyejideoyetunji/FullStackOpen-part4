const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Blog = require("../model/blog")
const User = require("../model/user")
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

const initialUser = {
    "name": "ayo oyejide",
    "username": "inspiredjide",
    "password": "abcdefg"
}

async function initializeDB(){
    await Blog.deleteMany({}).catch(error => { logger.error(error) })
    await User.deleteMany({}).catch(error => { logger.error(error) })

    const passwordHash = await bcrypt.hash(initialUser.password, 10)
    const userDocument = new User({
        name: initialUser.name,
        username: initialUser.username,
        passwordHash
    })
    const user = await userDocument.save()

    for(const blog of initialBlogs){
        const blogDocument = new Blog({
            ...blog,
            user: user._id
        })
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

function deleteABlog(id, token){
    return api
        .delete(`/api/blogs/${id}`)
        .set("Authorization", token)
}

function addABlog(newBlog, token){
    return api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", token)
}

function login(user){
    return api
        .post("/api/login")
        .send(user)
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
    api, initialBlogs, initialUser, initializeDB, getAllBlogs, addABlog, getBlogsInDB, noneExistingId, getABlog, deleteABlog, login
}

afterAll(() => {
    mongoose.connection.close()
})
