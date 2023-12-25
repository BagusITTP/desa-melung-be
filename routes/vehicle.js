const router = require('express').Router()
const auth = require('../middleware/auth')
const vehicleController = require('../controllers/vehicleController')
const checkRole = require('../middleware/checkRole')

router.get("/", vehicleController.getVehicle)
router.delete("/:id", auth, checkRole(["admin"]), vehicleController.deleteVehicle)

module.exports = router