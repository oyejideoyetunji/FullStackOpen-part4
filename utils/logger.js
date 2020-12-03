function info(...details){
    if (process.env.NODE_ENV !== "test") {
        console.log(...details)
    }
}

function error(...details){
    console.error(...details)
}

module.exports = { info, error }
