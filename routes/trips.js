const router = require('express').Router()
const handler = require('../handlers/trips')
const isAuth = require('../utils/isAuth')
const { playValidator } = require('../utils/validator')

router.get('/shared-trips', isAuth(), handler.get.sharedTrips)
router.get('/offer-trips', isAuth(), handler.get.offeredTrip)

module.exports = router