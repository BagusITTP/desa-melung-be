const Joi = require('joi')
const { article_image } = require('../models')
const ImageKit = require('../lib/imagekit')

const getArticleImage = async (req, res) => {
  const data = await article_image.findAll({
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

const deleteArticleImage = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await article_image.findByPk(id)

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

    await article_image.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      message: `Data berhasil dihapus`
    })
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getArticleImage,
  deleteArticleImage
}