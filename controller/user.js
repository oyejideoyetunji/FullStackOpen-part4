const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../model/user")



userRouter.get("/", async(request, response, next) => {
    try {
        const users = await User
            .find({})
            .populate("blogs", { author: 1, title: 1, url: 1, })
        if(users){
            response.status(200).json(users)
        }else {
            response.status(404).json({ message: "content not found" })
        }
    } catch (error) {
        next(error)
    }
})

userRouter.post("/", async (request, response, next) => {
    const userData = request.body
    if(userData.password.length < 3) return response.status(400).json({ message: "invalid password format" })

    try{
        const passwordHash = await bcrypt.hash(userData.password, 10)
        const user = new User({
            name: userData.name,
            username: userData.username,
            passwordHash
        })

        const newUser = await user.save()
        if(newUser){
            response.status(201).json(newUser)
        }else {
            response.status(500).json({
                message: "sorry there was an error on the server"
            })
        }
    }catch(error){
        next(error)
    }
})

module.exports = userRouter
