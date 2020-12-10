function unknownEndPoint(req, res){
    res.status(404).json({ message: "unknown endpoint" })
}

function errorHandler(error, req, res, next){

    if(error.name === "CastError"){
        res.status(400).json({ message: "malformated id" })
    }else if(error.name === "ValidationError"){
        res.status(400).json({ message: error.message })
    } else if (error.name === "JsonWebTokenError"){
        res.status(401).json({ message: "missing or invalid token" })
    }else {
        res.status(500).json({ message: "an error occurred on the server " })
    }

    next(error)

}

function tokenExtractor(request, response, next){
    const authorization = request.get("authorization")

    request.token = (authorization && authorization.toLowerCase().startsWith("bearer ")) ?
        authorization.substring(7) :
        null;

    next()
}


module.exports = { unknownEndPoint, errorHandler, tokenExtractor }

