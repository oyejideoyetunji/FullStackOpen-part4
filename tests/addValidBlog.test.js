const mongoose = require("mongoose")
const { initialBlogs, initializeDB, addABlog, getBlogsInDB } = require("./testHelper")



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
    const blogs = await getBlogsInDB();
    if(blogs) expect(blogs).toHaveLength(initialBlogs.length + 1);

})

afterAll(() => {
    mongoose.connection.close()
})
