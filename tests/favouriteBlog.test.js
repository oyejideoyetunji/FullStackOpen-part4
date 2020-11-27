const {
    blogs, singleBlog, favouriteBlog
} = require("../utils/list_helper")




describe("favourite blog", () => {

    test("of an empty blog list is null", () => {
        expect(favouriteBlog([])).toBe(null)
    })

    test("of a blog list with just one item is that item", () => {
        expect(favouriteBlog(singleBlog)).toEqual({
            _id:    "5a422bc61b54a676234d17fc",
            title:  "Type wars",
            author: "Robert C. Martin",
            url:    "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes:  2,
            __v:    0
        })
    })

    test("of a blog list more than one is calculated properly", () => {
        expect(favouriteBlog(blogs)).toEqual({
            _id:    "5a422b3a1b54a676234d17f9",
            title:  "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url:    "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes:  12,
            __v:    0
        })
    })

})
