const mongoose = require("mongoose")
const { initialBlogs, initialUser, login, getBlogsInDB, initializeDB, addABlog } = require("./testHelper")



beforeEach(initializeDB)

test("when a blog is added without the likes value, the likes value is default to 0", async () => {
    const newBlog = {
        "title": "Type wars",
        "author": "Robert C. Martin",
        "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }

    const response = await login(initialUser)
    if (response.body.token) {
        const addedBlog = await addABlog(newBlog, `Bearer ${response.body.token}`)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        if(addedBlog) expect(addedBlog.body.likes).toBe(0)
        const blogs = await getBlogsInDB();
        if (blogs) expect(blogs).toHaveLength(initialBlogs.length + 1);
    }
})

afterAll(() => {
    mongoose.connection.close()
})
