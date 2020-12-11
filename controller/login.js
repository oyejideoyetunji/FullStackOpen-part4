const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../model/user")



loginRouter.post("/", async (request, response, next) => {
    const body = request.body
    try{
        const user = await User.findOne({ username: body.username })
        const isValidCredentials = user === null ?
            false : await bcrypt.compare(body.password, user.passwordHash)

        if(!(user && isValidCredentials)){
            return response.status(401).json({ message: "invalid username or password" })
        }

        const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.SECRETE
        )

        response
            .status(200)
            .json({ token, name: user.name, username: user.username })
    }catch(error){
        next(error)
    }

})

module.exports = loginRouter
