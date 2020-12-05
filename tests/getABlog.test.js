const mongoose = require("mongoose")
const { initializeDB, getABlog, getBlogsInDB } = require("./testHelper")


beforeEach(initializeDB)

test("a blog can be viewd from db", async() => {
    const blogsInDb = await getBlogsInDB()
    const idOfBlogToGet = blogsInDb[0]._id.toString()

    const response = await getABlog(idOfBlogToGet)
        .expect(200)
        .expect("Content-Type", /application\/json/)
    const formatedBlog = JSON.parse(JSON.stringify(blogsInDb[0]))

    if(response){
        expect(response.body).toEqual(formatedBlog)
    }
})

afterAll(() => {
    mongoose.connection.close()
})
