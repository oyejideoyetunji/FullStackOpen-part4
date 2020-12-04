const mongoose = require("mongoose")
const { initialBlogs, initializeDB, getAllBlogs } = require("./testHelper")



beforeEach(initializeDB)

test("blog api will return json data", async() => {
    const resp = await getAllBlogs()

    if (resp) expect(resp.body).toHaveLength(initialBlogs.length)
})


afterAll(() => {
    mongoose.connection.close()
})
