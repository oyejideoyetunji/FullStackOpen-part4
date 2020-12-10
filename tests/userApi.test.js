const bcrypt = require("bcrypt")
const User = require("../model/user")
const mongoose = require("mongoose")
const app = require("../app")
const supertest = require("supertest")


const api = supertest(app)


describe("when there is initially a user in db", () => {

    beforeEach(async() => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("apassword", 10)
        const newUser = new User({
            name:       "John doe",
            username:   "jdoe",
            passwordHash
        })

        await newUser.save()
    })

    test("a new user is created successfully and added to the db", async() => {
        const usersInitiallyInDb = await User.find({})

        const newUser = {
            name: "ayodele oyejide",
            username: "inspiredjames",
            password: "abcdefg"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)
            .catch(error => {console.error(error)})

        const usersInDbAfterRequest = await User.find({})

        if(usersInDbAfterRequest) expect(usersInDbAfterRequest).toHaveLength(usersInitiallyInDb.length + 1)
    })

    test("creation of a new user fails with appropriate error message when the username already exists in db or is less than 3",
        async () => {
            const usersInitiallyInDb = await User.find({})

            const newUser = {
                name: "oluwatobi oyejide",
                username: "jdoe",
                password: "123456"
            }

            const response = await api
                .post("/api/users")
                .send(newUser)
                .expect(400)
                .expect("Content-Type", /application\/json/)

            if(response) expect(response.body.message).toContain("`username` to be unique")

            const usersInDbAfterRequest = await User.find({})
            if (usersInDbAfterRequest) expect(usersInDbAfterRequest).toHaveLength(usersInitiallyInDb.length)

            const newUser1 = {
                name: "tobi oyejide",
                username: "js",
                password: "123456"
            }

            const response1 = await api
                .post("/api/users")
                .send(newUser1)
                .expect(400)
                .expect("Content-Type", /application\/json/)

            if (response1) expect(response1.body.message).toContain("User validation failed")

            const usersInDbAfterRequest1 = await User.find({})
            if (usersInDbAfterRequest1) expect(usersInDbAfterRequest1).toHaveLength(usersInitiallyInDb.length)
        }
    )

    test("creation of a new user fails with appropriate error message when the length of the password is less than 3",
        async () => {
            const usersInitiallyInDb = await User.find({})

            const newUser = {
                name: "tobi jide",
                username: "cooldev",
                password: "12"
            }

            const response = await api
                .post("/api/users")
                .send(newUser)
                .expect(400)
                .expect("Content-Type", /application\/json/)

            if (response) expect(response.body.message).toContain("invalid password format")

            const usersInDbAfterRequest = await User.find({})
            if (usersInDbAfterRequest) expect(usersInDbAfterRequest).toHaveLength(usersInitiallyInDb.length)
        }
    )

})

afterAll(() => {
    mongoose.connection.close()
})
