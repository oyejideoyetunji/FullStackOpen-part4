function unknownEndPoint(req, res){
    res.status(404).json({ message: "unknown endpoint" })
}

function errorHandler(error, req, res, next){

    if(error.name === "CastError"){
        res.status(400).json({ message: "malformated id" })
    }else if(error.name === "ValidationError"){
        res.status(400).json({ message: error.message })
    }else {
        res.status(500).json({ message: "an error occurred on the server " })
    }

    next(error)

}


module.exports = { unknownEndPoint, errorHandler }

