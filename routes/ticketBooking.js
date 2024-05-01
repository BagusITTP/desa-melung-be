const router = require('express').Router()
const auth = require('../middleware/auth')
const ticketBookingController = require('../controllers/ticketBookingController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin"]), ticketBookingController.getTicketBooking)
router.get("/user", auth, checkRole(["user"]), ticketBookingController.getByUser)
router.get("/order/", auth, checkRole(["user"]), ticketBookingController.getByOrderId)
router.post("/", auth, checkRole(["admin", "user"]), ticketBookingController.createTicketBooking)
router.post("/repay/", auth, checkRole(["admin", "user"]), ticketBookingController.reCreateTicketBooking)
router.get("/payment/success", ticketBookingController.midtransCallback)
router.post("/payment/success", ticketBookingController.midtransCallback)
router.delete("/:id", auth, checkRole(["admin"]), ticketBookingController.deleteTicketBooking)

module.exports = router