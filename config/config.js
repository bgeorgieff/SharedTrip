const env = process.env.NODE_ENV || 'development'

const config = {
    development: {
        port: process.env.PORT || 4000,
        dbURL: 'mongodb+srv://Blagovest:qwerty123@cluster0.tljof.mongodb.net/SharedTrip?retryWrites=true&w=majority',
        cookie: 'x-auth-token',
        secret: 'one-ring'
    },
    production: {}
}

module.exports = config[env]