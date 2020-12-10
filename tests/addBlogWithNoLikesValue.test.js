const mongoose = require("mongoose")
const { initializeDB, addABlog } = require("./testHelper")


const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imluc3BpcmVkamFtZXMiLCJpZCI6IjVmY2YzNjM1NTEyMGRhNmIwYTUxOGFjOCIsImlhdCI6MTYwNzQ0MjQ2Nn0._AIzSKaP0QD96_dPKaUpRKmvvwbrV-EyHyu-RRBP-HU"

beforeEach(initializeDB)

test("An incomplete blog document will not be saved to DB", async () => {
    const newBlog = {
        "title": "Type wars",
        "author": "Robert C. Martin",
        "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }

    const addedBlog = await addABlog(newBlog, token)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    if(addedBlog){
        expect(addedBlog.body.likes).toBe(0)
        console.log(addedBlog.body)
    }
})

afterAll(() => {
    mongoose.connection.close()
})
