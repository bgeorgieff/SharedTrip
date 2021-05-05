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
                const currentUser = JSON.stringify(req.user._id)
                const availableSeats = (trip.seats) - trip.otherPpl.length

                res.render('./trips/detailsTrip.hbs', {
                    isLoggedIn: req.user !== undefined,
                    userEmail: req.user ? req.user.email : '',
                    trip,
                    isTheDriver: JSON.stringify(trip.driver) === currentUser,
                    isAlreadyJoined: JSON.stringify(trip.otherPpl).includes(currentUser),
                    areSeatsAvailable: availableSeats > 0,
                    availableSeats
                })
            })
        },

        closeTrip(req, res, next) {
            const {id} = req.params
            Trip.deleteOne({_id: id}).then((r) => {
                res.redirect('/trip/shared-trips')
            })
        },

        joinTrip(req, res, next) {
            const {id} = req.params
            const { _id } = req.user

            Trip.updateOne({_id: id}, {$push: {otherPpl: _id}}).then((upd) => {
                res.redirect(`/trip/details-trip/${id}`)
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

            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                    res.render('./trips/offerTrip.hbs', {
                    isLoggedIn: req.user !== undefined,
                    userEmail: req.user ? req.user.email : '',
                    message: errors.array()[0].msg
                })
                return
            }

            Trip.create({startPoint, endPoint, date, time, seats, carImage, description, driver: _id}).then((createdTrip) => {
                res.redirect('/trip/shared-trips')
            })
        }
    }
}