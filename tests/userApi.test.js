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
            name: "oluwatobi oyejide",
            username: "oyejideoyetunji",
            password: "123456"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersInDbAfterRequest = await User.find({})

        if(usersInDbAfterRequest) expect(usersInDbAfterRequest).toHaveLength(usersInitiallyInDb.length + 1)
    })

    test("creation of a new user fails with appropriate error message when the username already exists in db",
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
        }
    )

})

afterAll(() => {
    mongoose.connection.close()
})
