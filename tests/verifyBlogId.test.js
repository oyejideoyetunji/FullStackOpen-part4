const mongoose = require("mongoose")
const { initializeDB, getAllBlogs } = require("./testHelper")



beforeEach(initializeDB)

test("each blog post contains id property", async () => {
    const resp = await getAllBlogs()

    if(resp){
        for(const blog of resp.body){
            expect(blog.id).toBeDefined()
        }
    }
})


afterAll(() => {
    mongoose.connection.close()
})
