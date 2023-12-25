const Joi = require('joi')
const { vehicle } = require('../models')
const ImageKit = require('../lib/imagekit')

const getVehicle = async (req, res) => {
  const data = await vehicle.findAll({
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

const deleteVehicle = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await vehicle.findByPk(id)

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

    await vehicle.destroy({
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
  getVehicle,
  deleteVehicle
}