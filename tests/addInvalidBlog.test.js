const mongoose = require("mongoose")
const { initialBlogs, initialUser, login, initializeDB, addABlog, getBlogsInDB } = require("./testHelper")



beforeEach(initializeDB)

test("An incomplete blog document will not be saved to DB", async () => {
    const newBlog = {
        "author": "tobi oyejide",
        "likes": 4
    }

    const response = await login(initialUser)
    if (response.body.token) {
        await addABlog(newBlog, `Bearer ${response.body.token}`)
            .expect(400)
            .expect("Content-Type", /application\/json/)
        const blogs = await getBlogsInDB();
        if (blogs) expect(blogs).toHaveLength(initialBlogs.length);
    }
})

afterAll(() => {
    mongoose.connection.close()
})
