const Joi = require('joi')
const { tour_package, tour_image } = require('../models')
const ImageKit = require('../lib/imagekit')

const getTourPackage = async (req, res) => {
  data = await tour_package.findAll({
    order: [["id", "Asc"]],
    include: [
      {
        model: tour_image,
        as: 'tour_images'
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
    res.status(500).json({
      status: "success",
      message: error.message
    })
  }
}

const createTourPackage = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required().label("Judul"),
    sub_title: Joi.string().required().label("Sub Judul"),
    description: Joi.string().required().label("Deskripsi"),
    price: Joi.number().required().label("Harga"),
    facilities: Joi.array().items(Joi.string()).required().label("Fasilitas"),
  })

  const val = schema.validate(req.body)

  if (!(val.error)) {
    try {
      const datas = val.value

      const data = await tour_package.create({
        ...datas
      })

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

        await tour_image.create({
          name: photo.originalname,
          fileId: img.fileId,
          url: img.url,
          tour_package_id: data.id
        })
      }

      res.status(201).json({
        status: 'success',
        message: `Paket Wisata telah ditambahkan`
      })
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message
      })
    }
  } else {
    const message = val.error.details[0].message
    res.status(400).json({
      status: "failed",
      message
    })
  }
}

const updateTourPackage = async (req, res) => {
  const id = req.params.id;

  const dataId = await tour_package.findOne({ where: { id } });

  if (dataId === null) {
    return res.status(404).json({
      status: 'failed',
      message: `Data tidak ditemukan`
    });
  }

  const schema = Joi.object({
    title: Joi.string().required().label("Judul"),
    sub_title: Joi.string().required().label("Sub Judul"),
    description: Joi.string().required().label("Deskripsi"),
    price: Joi.number().required().label("Harga"),
    facilities: Joi.array().items(Joi.string()).required().label("Fasilitas"),
  });

  const { error, value: datas } = schema.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({
      status: "failed",
      message
    });
  }

  try {
    if (req.files) {
      for (const photo of req.files) {
        const split = photo.originalname.split('.');
        const ext = split[split.length - 1];
        const img = await ImageKit.upload({
          file: photo.buffer,
          fileName: `IMG-${Date.now()}.${ext}`
        });
        await tour_image.create({
          name: photo.originalname,
          fileId: img.fileId,
          url: img.url,
          tour_package_id: id
        });
      }
    }

    await tour_package.update(datas, { where: { id } });

    res.status(200).json({
      status: 'success',
      message: `Paket Wisata telah berhasil terubah`,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
};

const deleteTourPackage = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await tour_package.findByPk(id, {
      include: { all: true, nested: true }
    })

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    if (dataId.tour_images) {
      for (let i = 0; i < dataId.tour_images.length; i++) {
        const photo = dataId.tour_images[i];
        await ImageKit.deleteFile(photo.fileId)
        await tour_image.destroy({
          where: {
            id: photo.id
          }
        })
      }
    }

    await tour_package.destroy({
      where: {
        id
      }
    })

    res.status(200).json({
      status: 'success',
      message: `Paket Wisata berhasil dihapus`
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getTourPackage,
  createTourPackage,
  updateTourPackage,
  deleteTourPackage
}