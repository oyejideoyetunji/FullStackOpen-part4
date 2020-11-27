const {
    blogs, singleBlog, totalLikes
} = require("../utils/list_helper")




describe("totalLikes", () => {

    test("of an empty blog list is zero", () => {
        expect( totalLikes([]) ).toBe(0)
    })

    test("of a blog list with just one item is the number of likes of the item", () => {
        expect( totalLikes(singleBlog) ).toBe(2)
    })

    test("of a blog list more than one is calculated properly", () => {
        expect( totalLikes(blogs) ).toBe(36)
    })

})
