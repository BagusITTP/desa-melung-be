const router = require('express').Router()
const auth = require('../middleware/auth')
const facilitiesAttractionController = require('../controllers/facilitiesAttractionController')
const checkRole = require('../middleware/checkRole')

router.get("/", facilitiesAttractionController.getFacilitiesAttraction)
router.delete("/:id", auth, checkRole(["admin"]), facilitiesAttractionController.deleteFacilitiesAttraction)

module.exports = router