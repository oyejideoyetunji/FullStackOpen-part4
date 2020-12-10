const mongoose = require("mongoose")
const { initialBlogs, initializeDB, addABlog, getBlogsInDB } = require("./testHelper")


const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imluc3BpcmVkamFtZXMiLCJpZCI6IjVmY2YzNjM1NTEyMGRhNmIwYTUxOGFjOCIsImlhdCI6MTYwNzQ0MjQ2Nn0._AIzSKaP0QD96_dPKaUpRKmvvwbrV-EyHyu-RRBP-HU"

beforeEach(initializeDB)

test("An incomplete blog document will not be saved to DB", async () => {
    const newBlog = {
        "author": "tobi oyejide",
        "likes": 4
    }

    await addABlog(newBlog, token)
        .expect(400)

    const blogs = await getBlogsInDB()
    expect(blogs).toHaveLength(initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})
