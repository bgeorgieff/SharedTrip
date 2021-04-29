const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

module.exports = {
    createToken(data) {
        return jwt.sign({ _id: data._id }, secret)
    },
    verifyToken(token) {

    }
}