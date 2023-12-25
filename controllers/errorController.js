const error = async (req, res) => {
  return res.status(500).json({
    status: 'failed',
    message: "Terjadi kesalahan pada server"
  })
}

module.exports = {
  error
}