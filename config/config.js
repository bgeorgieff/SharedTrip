const env = process.env.NODE_ENV || 'development'

const DB_PASSWORD = process.env.DB_PASSWORD
const DB_USERNAME = process.env.DB_USERNAME

const config = {
    development: {
        port: process.env.PORT || 4000,
        dbURL: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.tljof.mongodb.net/SharedTrip?retryWrites=true&w=majority`,
        cookie: 'x-auth-token',
        secret: 'one-ring'
    },
    production: {}
}

module.exports = config[env]