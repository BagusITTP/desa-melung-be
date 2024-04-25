const Joi = require('joi')
const { article, comment, article_image } = require('../models')
const ImageKit = require('../lib/imagekit')

const getArticle = async (req, res) => {
  data = await article.findAll({
    order: [["id", "Asc"]],
    include: [
      {
        model: article_image,
        as: 'article_images'
      },
      {
        model: comment,
        as: 'comments'
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

const getPageArticle = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const rows = await article.findAll({
    order: [["id", "Desc"]],
    include: [
      {
        model: article_image,
        as: 'article_images'
      }
    ],
    offset: offset,
    limit: limit
  });

  const count = await article.count()

  try {
    if (rows) {
      return res.status(200).json({
        total: count,
        page: page,
        data: rows
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

const createArticle = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required().label("Judul"),
    description: Joi.string().required().label("Deskripsi"),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({
      status: "failed",
      message
    });
  }

  try {
    const data = await article.create({
      ...value
    });

    await Promise.all(req.files.map(async (photo) => {
      const split = photo.originalname.split(".");
      const ext = split[split.length - 1];

      const img = await ImageKit.upload({
        file: photo.buffer,
        fileName: `IMG-${Date.now()}.${ext}`
      });

      await article_image.create({
        name: photo.originalname,
        fileId: img.fileId,
        url: img.url,
        article_id: data.id
      });
    }));

    res.status(201).json({
      status: "success",
      message: "Data berhasil ditambahkan"
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;

  const dataId = await article.findOne({ where: { id } });

  if (!dataId) {
    return res.status(404).json({
      status: 'failed',
      message: `Data tidak ditemukan`
    });
  }

  const schema = Joi.object({
    title: Joi.string().required().label("Judul"),
    description: Joi.string().required().label("Deskripsi")
  });

  const { error, value: datas } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "failed",
      message: error.details[0].message
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
        await article_image.create({
          name: photo.originalname,
          fileId: img.fileId,
          url: img.url,
          article_id: id
        });
      }
    }

    await article.update(datas, { where: { id } });

    res.status(200).json({
      status: 'success',
      message: `Data berhasil terubah`,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await article.findByPk(id, {
      include: { all: true, nested: true }
    })

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    if (dataId.article_images) {
      for (let i = 0; i < dataId.article_images.length; i++) {
        const photo = dataId.article_images[i];
        await ImageKit.deleteFile(photo.fileId)
        await article_image.destroy({
          where: {
            id: photo.id
          }
        })
      }
    }

    await article.destroy({
      where: {
        id
      }
    })

    res.status(200).json({
      status: 'success',
      message: `Data berhasil dihapus`
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getArticle,
  getPageArticle,
  createArticle,
  updateArticle,
  deleteArticle
}