const router = require('express').Router()
const auth = require('../middleware/auth')
const tourBookingController = require('../controllers/tourBookingController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin"]), tourBookingController.getTourBooking)
router.get("/dashboard", auth, checkRole(["admin", "user"]), tourBookingController.getDashboard)
router.get("/user", auth, checkRole(["admin", "user"]), tourBookingController.getByUser)
router.get("/order/", auth, checkRole(["user"]), tourBookingController.getByOrderId)
router.post("/repay", auth, checkRole(["admin", "user"]), tourBookingController.reCreateTourBooking)
router.post("/", auth, checkRole(["admin", "user"]), tourBookingController.createTourBooking)
router.get("/payment/success", tourBookingController.midtransCallback)
router.post("/payment/success", tourBookingController.midtransCallback)
router.delete("/:id", auth, checkRole(["admin"]), tourBookingController.deleteTourBooking)

module.exports = router