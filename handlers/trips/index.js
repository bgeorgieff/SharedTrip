const User = require('../users/user')
const { validationResult } = require('express-validator')
const Trip = require('./trip')


module.exports = {
    get: {
        sharedTrips(req, res, next) {
            Trip.find().lean().then((trips) => {
                res.render('./trips/sharedTrips.hbs', {
                    isLoggedIn: req.user !== undefined,
                    userEmail: req.user ? req.user.email : '',
                    trips
                })
            })
        },
        offeredTrip(req, res, next) {
            res.render('./trips/offerTrip.hbs', {
                isLoggedIn: req.user !== undefined,
                userEmail: req.user ? req.user.email : ''
            }) 
        },
        detailsTrip(req, res, next) {
            const {id} = req.params
            Trip.findById(id).lean().then((trip) => {
                res.render('./trips/detailsTrip.hbs', {
                    isLoggedIn: req.user !== undefined,
                    userEmail: req.user ? req.user.email : '',
                    trip
                })
            })
        }
    },
    post: {
        offeredTrip(req, res, next) {
            const {
                directions,
                dateTime,
                seats,
                carImage,
                description
            } = req.body

            const [startPoint, endPoint] = directions.split(' - ')
            const [date, time] = dateTime.split(' - ')
            const { _id } = req.user

            Trip.create({startPoint, endPoint, date, time, seats, carImage, description, driver: _id}).then((createdTrip) => {
                res.redirect('/trip/shared-trips')
            })
        }
    }
}