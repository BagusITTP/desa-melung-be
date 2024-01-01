const router = require('express').Router()
const auth = require('../middleware/auth')
const ticketBookingController = require('../controllers/ticketBookingController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin"]), ticketBookingController.getTicketBooking)
router.get("/user", auth, checkRole(["admin", "user"]), ticketBookingController.getByUser)
router.post("/", auth, checkRole(["admin", "user"]), ticketBookingController.createTicketBooking)
router.get("/payment/success", ticketBookingController.midtransCallback)
router.post("/payment/success", ticketBookingController.midtransCallback)
router.delete("/:id", auth, checkRole(["admin"]), ticketBookingController.deleteTicketBooking)

module.exports = router