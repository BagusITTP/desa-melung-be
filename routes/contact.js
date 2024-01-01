const router = require('express').Router()
const auth = require('../middleware/auth')
const contactController = require('../controllers/contactController')
const checkRole = require('../middleware/checkRole')
const upload = require('../middleware/uploader')

router.get("/", contactController.getContact)
router.post("/", auth, checkRole(["user"]), upload.array('image[]'), contactController.createContact)
router.delete("/:id", auth, checkRole(["admin"]), contactController.deleteContact)

module.exports = router