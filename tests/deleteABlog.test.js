const mongoose = require("mongoose")
const { initializeDB, getBlogsInDB, deleteABlog } = require("./testHelper")


beforeEach(initializeDB)


test("A blog can be deleted", async() => {
    const blogsAtStart = await getBlogsInDB()
    const idOfBlogToGet = blogsAtStart[0]._id.toString()

    await deleteABlog(idOfBlogToGet).expect(204)

    const blogsAtEnd = await getBlogsInDB()
    if(blogsAtStart && blogsAtEnd){
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    }
})

afterAll(() => {
    mongoose.connection.close()
})
