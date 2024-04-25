const router = require('express').Router()
const auth = require('../middleware/auth')
const attractionController = require('../controllers/attractionController')
const checkRole = require('../middleware/checkRole')
const upload = require('../middleware/uploader')

router.get("/", attractionController.getAttraction)
router.put("/:id", auth, checkRole(["admin"]), upload.array('images[]'), attractionController.updateAttraction)
router.delete("/:id", auth, checkRole(["admin"]), attractionController.deleteAttraction)

module.exports = router