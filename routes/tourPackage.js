const router = require('express').Router()
const auth = require('../middleware/auth')
const tourPackageController = require('../controllers/tourPackageController')
const checkRole = require('../middleware/checkRole')
const upload = require('../middleware/uploader')

router.get("/", tourPackageController.getTourPackage)
router.post("/", auth, checkRole(["admin"]), upload.array('image[]'), tourPackageController.createTourPackage)
router.put("/:id", auth, checkRole(["admin"]), upload.array('image[]'), tourPackageController.updateTourPackage)
router.delete("/:id", auth, checkRole(["admin"]), tourPackageController.deleteTourPackage)

module.exports = router