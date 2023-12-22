const jwt = require("jsonwebtoken")
const { user } = require('../models')

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(404).json({
        status: 'failed',
        message: "token tidak ditemukan"
      })
    }

    const bearerToken = req.headers.authorization

    const token = bearerToken.split("Bearer ")[1]

    const payload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY)

    const users = await user.findByPk(payload.id)

    if (users) {
      req.user = users
      next();
    } else {
      return res.status(400).json({
        status: 'failed',
        message: "Token invalid"
      })
    }
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      message: e.message
    })
  }
}