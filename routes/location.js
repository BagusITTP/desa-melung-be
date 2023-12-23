const router = require('express').Router()
const auth = require('../middleware/auth')
const locationController = require('../controllers/locationController')
const checkRole = require('../middleware/checkRole')

router.get("/", locationController.getLocation)
router.delete("/:id", auth, checkRole(["admin"]), locationController.deleteLocation)

module.exports = router