const router = require('express').Router()
const auth = require('../middleware/auth')
const articleImageController = require('../controllers/articleImageController')
const checkRole = require('../middleware/checkRole')

router.get("/", articleImageController.getArticleImage)
router.delete("/:id", auth, checkRole(["admin"]), articleImageController.deleteArticleImage)

module.exports = router