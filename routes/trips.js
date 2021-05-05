const router = require('express').Router()
const handler = require('../handlers/trips')
const isAuth = require('../utils/isAuth')
const validations = require('../utils/validator')

router.get('/shared-trips', isAuth(), handler.get.sharedTrips)
router.get('/offer-trips', isAuth(), handler.get.offeredTrip)
router.get('/details-trip/:id', isAuth(), handler.get.detailsTrip)
router.get('/close-trip/:id', isAuth(), handler.get.closeTrip)
router.get('/join-trip/:id', isAuth(), handler.get.joinTrip)

router.post('/offer-trips', isAuth(), validations, handler.post.offeredTrip)

module.exports = router