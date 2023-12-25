const router = require('express').Router()
const { error } = require('../controllers/errorController')
const { notFound } = require('../controllers/notFoundController')

const Attraction = require('./attraction')
const AttractionImage = require('./attractionImage')
const TourPackage = require('./tourPackage')
const TourImage = require('./tourImage')
const Vehicle = require('./vehicle')
const User = require('./user')

router.use("/api/v1/attractions", Attraction)
router.use("/api/v1/attraction/image", AttractionImage)
router.use("/api/v1/tours", TourPackage)
router.use("/api/v1/tour/image", TourImage)
router.use("/api/v1/vehicles", Vehicle)
router.use("/api/v1/user", User)
router.use(notFound)
router.use(error)

module.exports = router