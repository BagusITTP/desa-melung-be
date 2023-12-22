module.exports = (role) => {
  return function async(req, res, next) {
    if (!(role.includes(req.user.role))) {
      res.status(403).json({
        status: "failed",
        message: `Hanya ${role} yang dapat akses`
      })
    } else {
      next()
    }
  }
}