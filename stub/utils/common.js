const wait = (ms) => (req, res, next) => {
    setTimeout(next, ms);
}

const resConstructor =  {
    success: (data) => ({
        status: true,
        body: data
    }),
    error: (code, message) => ({
        status: false,
        error: {
            code,
            message
        }
    })
}

module.exports = {
    wait, resConstructor
}