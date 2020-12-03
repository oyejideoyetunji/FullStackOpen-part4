const {
    blogs, singleBlog, mostBlogs
} = require("../utils/list_helper")




describe("most blogs", () => {

    test("of an empty blog list is null", () => {
        expect(mostBlogs([])).toBe(null)
    })

    test("of a blog list with just one item is that item", () => {
        expect(mostBlogs(singleBlog)).toEqual({
            author: "Robert C. Martin",
            blogCount:  1
        })
    })

    test("of a blog list more than one is calculated properly", () => {
        expect(mostBlogs(blogs)).toEqual({ author: "Robert C. Martin", blogCount: 3 })
    })

})
