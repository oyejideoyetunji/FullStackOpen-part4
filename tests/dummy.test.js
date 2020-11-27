const {
    blogs, singleBlog, dummy
} = require("../utils/list_helper")



test("test for dummy", () => {
    expect(dummy(singleBlog)).toBe(1)
})

test("test for dummy", () => {
    expect(dummy(blogs)).toBe(1)
})