const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const singleBlog = [
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]



// eslint-disable-next-line no-unused-vars
function dummy(blogs){
    return 1
}

function totalLikes(blogs){
    if(blogs.length === 0) return 0;
    if(blogs.length === 1) return blogs[0].likes;

    return blogs.reduce((total, current) => {
        return total + current.likes
    }, 0)
}

function favouriteBlog(blogs){
    if(blogs.length === 0 ) return null;
    if(blogs.length === 1) return blogs[0];

    let favourite = blogs[0];

    for(const blog of blogs){
        if(blog.likes > favourite.likes){
            favourite = blog
        }
    }

    return favourite
}

function mostBlogs(blogs){
    if (blogs.length === 0) return null;
    if (blogs.length === 1){
        return { author: blogs[0].author, blogs: 1 }
    }

    let authors = {};
    authors[blogs[0].author] = { author: blogs[0].author, blogs: 0 };
    let authorWithMostBlog = blogs[0].author;

    for(const blog of blogs){
        if(blog.author in authors){
            authors[blog.author].blogs += 1;
            if (authors[blog.author].blogs > authors[authorWithMostBlog].blogs){
                authorWithMostBlog = blog.author
            }
        }else {
            authors[blog.author] = { author: blog.author, blogs: 1 }
        }
    }

    return authors[authorWithMostBlog]
}

function mostLikes(blogs) {
    if (blogs.length === 0) return null;
    if (blogs.length === 1) {
        return { author: blogs[0].author, likes: blogs[0].likes }
    }

    let authors = {};
    authors[blogs[0].author] = { authorName: blogs[0].author, likes: 0 };
    let authorWithMostLikes = blogs[0].author;

    for (const blog of blogs) {
        if (blog.author in authors) {
            authors[blog.author].likes += blog.likes;
            if (authors[blog.author].likes > authors[authorWithMostLikes].likes) {
                authorWithMostLikes = blog.author
            }
        } else {
            authors[blog.author] = { author: blog.author, likes: blog.likes }
        }
    }

    return authors[authorWithMostLikes]
}

module.exports = { blogs, singleBlog, dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }
