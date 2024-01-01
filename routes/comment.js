const router = require('express').Router()
const auth = require('../middleware/auth')
const commentController = require('../controllers/commentController')
const checkRole = require('../middleware/checkRole')

router.get("/", commentController.getComment)
router.post("/", auth, checkRole(["user"]), commentController.createComment)
router.delete("/:id", auth, checkRole(["admin"]), commentController.deleteComment)

module.exports = router