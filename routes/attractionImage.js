const router = require('express').Router()
const auth = require('../middleware/auth')
const attractionImageController = require('../controllers/attractionImageController')
const checkRole = require('../middleware/checkRole')

router.get("/", attractionImageController.getAttractionImage)
router.delete("/:id", auth, checkRole(["admin"]), attractionImageController.deleteAttractionImage)

module.exports = router