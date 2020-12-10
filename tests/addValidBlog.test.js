const mongoose = require("mongoose")
const { initialBlogs, initialUser, initializeDB, addABlog, getBlogsInDB, login } = require("./testHelper")



describe("when a user has been created in the db", () => {
    beforeEach(initializeDB)

    test("A valid blog document can be created by the user and saved to DB", async () => {
        const newBlog = {
            "title": "handling errors in javascript Async/await",
            "author": "oluwatobi oyejide",
            "url": "https://www.newdevblog.com",
            "likes": 5
        }

        const response = await login(initialUser)
        if(response.body.token){
            await addABlog(newBlog, `Bearer ${response.body.token}`)
                .expect(201)
                .expect("Content-Type", /application\/json/)
            const blogs = await getBlogsInDB();
            if (blogs) expect(blogs).toHaveLength(initialBlogs.length + 1);
        }
    })

    test("Adding a blog fails with the proper status code 401 if token is not provided", async () => {
        const newBlog = {
            "title":  "handling errors in javascript Async/await",
            "author": "oluwatobi oyejide",
            "url":    "https://www.newdevblog.com",
            "likes":  5
        }

        const response = await addABlog(newBlog, "")
            .expect(401)
            .expect("Content-Type", /application\/json/)
        if(response.body.message){
            expect(response.body.message).toContain("invalid token")
            const blogs = await getBlogsInDB();
            if (blogs) expect(blogs).toHaveLength(initialBlogs.length);
        }
    })
})

afterAll(() => {
    mongoose.connection.close()
})
