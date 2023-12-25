const Joi = require('joi')
const { attraction, attraction_image, vehicle } = require('../models')
const ImageKit = require('../lib/imagekit')

const getAttraction = async (req, res) => {
  data = await attraction.findAll({
    order: [["id", "Asc"]],
    include: [
      {
        model: attraction_image,
        as: 'attraction_images'
      }
    ]
  })

  try {
    if (data.length) {
      return res.status(200).json({
        status: "success",
        data
      })
    } else {
      return res.status(404).json({
        status: "Data tidak ada",
        data: []
      })
    }

  } catch (error) {
    return res.status(500).json({
      status: "success",
      message: error.message
    })
  }
}

const updateAttraction = async (req, res) => {
  const id = req.params.id

  const dataId = await attraction.findOne({ where: { id } })

  // TODO: Validasi apakah id ada
  if (dataId === null) {
    return res.status(404).json({
      status: 'failed',
      message: `Data tidak ditemukan`
    })
  }

  const schema = Joi.object({
    motor_price: Joi.number().required().label("Harga motor"),
    mobil_price: Joi.number().required().label("Harga mobil"),
    ticket_price: Joi.number().required().label("Harga tiket"),
    description: Joi.string().required().label("Deskripsi"),
    facilities: Joi.array().items(Joi.string()).required().label("Fasilitas"),
    locations: Joi.array().items(Joi.string()).required().label("Lokasi"),
  })

  const val = schema.validate(req.body)

  if (!(val.error)) {
    try {
      const { motor_price, mobil_price, ticket_price, description, facilities, locations } = val.value

      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          const photo = req.files[i];
          // get extension file
          const split = photo.originalname.split('.');
          const ext = split[split.length - 1];

          // proses upload file ke imagekit
          const img = await ImageKit.upload({
            file: photo.buffer, // required
            fileName: `IMG-${Date.now()}.${ext}`
          })

          await attraction_image.create({
            name: photo.originalname,
            fileId: img.fileId,
            url: img.url,
            attraction_id: id
          })
        }
      }

      await attraction.update({
        ticket_price,
        description,
        facilities,
        locations
      }, {
        where: {
          id
        }
      })

      for (let i = 1; i < 3; i++) {
        await vehicle.update({
          price: i === 1 ? motor_price : mobil_price
        }, {
          where: {
            id: i
          }
        })
      }

      return res.status(200).json({
        status: 'success',
        message: `Data telah berhasil terubah`,
      })
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message
      })
    }
  } else {
    const message = val.error.details[0].message
    return res.status(400).json({
      status: "failed",
      message
    })
  }
}

const deleteAttraction = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await attraction.findByPk(id, {
      include: { all: true, nested: true }
    })

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    for (let i = 0; i < dataId.images.length; i++) {
      const photo = dataId.images[i];
      await ImageKit.deleteFile(photo.fileId)
      await attraction_image.destroy({
        where: {
          id: photo.id
        }
      })
    }

    await attraction.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      message: `Data berhasil dihapus`
    })
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getAttraction,
  updateAttraction,
  deleteAttraction
}