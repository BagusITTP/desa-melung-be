const Joi = require('joi')
const { facilities_attraction } = require('../models')
const ImageKit = require('../lib/imagekit')

const getFacilitiesAttraction = async (req, res) => {
  const data = await facilities_attraction.findAll({
    order: [["id", "Asc"]],
    // include: { all: true, nested: true }
  })

  try {
    if (data.length) {
      return res.status(200).json({
        status: "success",
        data: data
      })
    } else {
      return res.status(404).json({
        status: "Data tidak ada",
        data: []
      })
    }

  } catch (error) {
    res.status(500).json({
      status: "success",
      message: error.message
    })
  }
}

const deleteFacilitiesAttraction = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await facilities_attraction.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    if (dataId.fileId) {
      await ImageKit.deleteFile(dataId.fileId)
    }

    await facilities_attraction.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      message: `Data dengan nama ${dataId.name} telah di hapus`
    })
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getFacilitiesAttraction,
  deleteFacilitiesAttraction
}