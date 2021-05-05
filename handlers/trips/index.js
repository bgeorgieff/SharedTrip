const User = require('../users/user')
const { validationResult } = require('express-validator')
const Trip = require('./trip')


module.exports = {
    get: {
        sharedTrips(req, res, next) {
            res.render('./trips/sharedTrips.hbs', {
                isLoggedIn: req.user !== undefined,
                userEmail: req.user ? req.user.email : ''
            })
        },
        offeredTrip(req, res, next) {
            res.render('./trips/offerTrip.hbs', {
                isLoggedIn: req.user !== undefined,
                userEmail: req.user ? req.user.email : ''
            }) 
        }
    },
    post: {

    }
}