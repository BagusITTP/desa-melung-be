const router = require('express').Router()
const auth = require('../middleware/auth')
const contactImageController = require('../controllers/contactImageController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin"]), contactImageController.getContactImage)
router.delete("/:id", auth, checkRole(["admin"]), contactImageController.deleteContactImage)

module.exports = router