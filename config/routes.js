const router = require('../routes')

module.exports = (app) => {
    app.use('/home', router.home)

    app.use('/', router.home)

    app.use('/users', router.users)

    app.use('/trip', router.trips)

}