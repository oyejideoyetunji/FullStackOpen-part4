const mongoose = require("mongoose")
const logger = require("../utils/logger")
const { initialBlogs, initializeDB, getAllBlogs, addABlog } = require("./testHelper")



beforeEach(initializeDB)

test("A vaid blog document will be saved to DB", async() => {
    const newBlog = {
        "title": "handling errors in javascript Async/await",
        "author": "oluwatobi oyejide",
        "url": "https://www.newdevblog.com",
        "likes": 5
    }

    await addABlog(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .catch(error => { logger.error(error) })
    const response = await getAllBlogs();
    if(response) expect(response.body).toHaveLength(initialBlogs.length + 1);

})

afterAll(() => {
    mongoose.connection.close()
})
