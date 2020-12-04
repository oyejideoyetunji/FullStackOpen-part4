const mongoose = require("mongoose")
const logger = require("../utils/logger")
const { initialBlogs, initializeDB, addABlog, getAllBlogs } = require("./testHelper")



beforeEach(initializeDB)

test("An incomplete blog document will not be saved to DB", async () => {
    const newBlog = {
        "title": "javascript Async/await",
        "author": "oluwatobi oyejide",
    }

    await addABlog(newBlog)
        .expect(400)
        .catch(error => logger.error(error))

    const response = await getAllBlogs()
    expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})
