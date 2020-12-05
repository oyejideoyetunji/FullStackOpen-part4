const mongoose = require("mongoose")
const { initialBlogs, initializeDB, addABlog, getBlogsInDB } = require("./testHelper")



beforeEach(initializeDB)

test("An incomplete blog document will not be saved to DB", async () => {
    const newBlog = {
        "author": "tobi oyejide",
        "likes": 4
    }

    await addABlog(newBlog)
        .expect(400)

    const blogs = await getBlogsInDB()
    expect(blogs).toHaveLength(initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})
