const mongoose = require("mongoose")
const {
    blogs, singleBlog, mostLikes
} = require("../utils/list_helper")




describe("favourite blog", () => {

    test("of an empty blog list is null", () => {
        expect(mostLikes([])).toBe(null)
    })

    test("of a blog list with just one item is that item", () => {
        expect(mostLikes(singleBlog)).toEqual({
            author: "Robert C. Martin",
            likes: 2
        })
    })

    test("of a blog list more than one is calculated properly", () => {
        expect(mostLikes(blogs)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })

})


afterAll(() => {
    mongoose.connection.close()
})
