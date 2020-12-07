const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const blogRouter = require("./controller/blog")
const userRouter = require("./controller/user")
const config = require("./utils/config")
const logger = require("./utils/logger")
const customMiddleWare = require("./utils/customMiddleware")



logger.info("connecting to mongodb")

mongoose.connect(
    config.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
).then(() => {
    logger.info("Successfully connected to mongodb")
}).catch( error => {
    logger.error("there was an error while connecting, Error: ", error)
})

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use(customMiddleWare.errorHandler)
app.use(customMiddleWare.unknownEndPoint)

module.exports = app
