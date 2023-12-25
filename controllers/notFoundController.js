const notFound = async (req, res) => {
  return res.status(404).json({
    status: 'failed',
    message: "URL tidak ditemukan"
  })
}

module.exports = {
  notFound
}