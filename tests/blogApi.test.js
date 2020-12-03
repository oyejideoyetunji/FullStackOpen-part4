const mongoose = require("mongoose")
const supertest = require("supertest")
const Blog = require("../model/blog")
const app = require("../app")
const { error } = require("../utils/logger")

const api = supertest(app)


const initialBlog = {
    "title":  "Smashing Magazine",
    "author": "John Doe",
    "url":    "https://dummie@url.com",
    "likes":   8
}

beforeEach(async () => {
    await Blog.deleteMany({}).catch(err => error(err))
    const newBlog = new Blog(initialBlog)
    await newBlog.save().catch(err => error(err))
})

test("blog api will return json data", async() => {
    const resp = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .catch(err => error(err))

    if (resp) expect(resp.body).toHaveLength(1)
})


afterAll(() => {
    mongoose.connection.close()
})
