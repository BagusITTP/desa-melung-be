const router = require('express').Router()
const auth = require('../middleware/auth')
const tourImageController = require('../controllers/tourImageController')
const checkRole = require('../middleware/checkRole')

router.get("/", tourImageController.getTourImage)
router.delete("/:id", auth, checkRole(["admin"]), tourImageController.deleteTourImage)

module.exports = router