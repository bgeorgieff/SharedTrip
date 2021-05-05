const router = require('express').Router()
const handler = require('../handlers/trips')
const isAuth = require('../utils/isAuth')
const { playValidator } = require('../utils/validator')

router.get('/shared-trips', isAuth(), handler.get.sharedTrips)
router.get('/offer-trips', isAuth(), handler.get.offeredTrip)
router.get('/details-trip/:id', isAuth(), handler.get.detailsTrip)

router.post('/offer-trips', isAuth(), handler.post.offeredTrip)

module.exports = router