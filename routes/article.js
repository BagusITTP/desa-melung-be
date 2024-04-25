const router = require('express').Router()
const auth = require('../middleware/auth')
const articleController = require('../controllers/articleController')
const checkRole = require('../middleware/checkRole')
const upload = require('../middleware/uploader')

router.get("/", articleController.getArticle)
router.get("/new", articleController.getPageArticle)
router.post("/", auth, checkRole(["admin"]), upload.array('images[]'), articleController.createArticle)
router.put("/:id", auth, checkRole(["admin"]), upload.array('images[]'), articleController.updateArticle)
router.delete("/:id", auth, checkRole(["admin"]), articleController.deleteArticle)

module.exports = router