const mongoose = require("mongoose")
const { initializeDB, getBlogsInDB, deleteABlog } = require("./testHelper")


const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imluc3BpcmVkamFtZXMiLCJpZCI6IjVmY2YzNjM1NTEyMGRhNmIwYTUxOGFjOCIsImlhdCI6MTYwNzQ0MjQ2Nn0._AIzSKaP0QD96_dPKaUpRKmvvwbrV-EyHyu-RRBP-HU"

beforeEach(initializeDB)

test("A blog can be deleted", async() => {
    const blogsAtStart = await getBlogsInDB()
    const idOfBlogToGet = blogsAtStart[0]._id.toString()

    await deleteABlog(idOfBlogToGet, token).expect(204)

    const blogsAtEnd = await getBlogsInDB()
    if(blogsAtStart && blogsAtEnd){
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    }
})

afterAll(() => {
    mongoose.connection.close()
})
