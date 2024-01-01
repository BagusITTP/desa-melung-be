const Joi = require('joi')
const { comment, article } = require('../models')

const getComment = async (req, res) => {
  data = await comment.findAll({
    order: [["id", "Asc"]],
    include: [
      {
        model: article,
        as: 'article'
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

const createComment = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required().label("Nama"),
      phone_number: Joi.string().required().label("Nomor Telepon"),
      message: Joi.string().required().label("Pesan"),
      article_id: Joi.number().required().label("Berita"),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      const message = error.details[0].message;
      return res.status(400).json({ status: 'failed', message });
    }

    await comment.create({ ...value });

    res.status(201).json({
      status: "success",
      message: `Komentar anda berhasil dibuat`,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await comment.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      return res.status(404).json({
        status: 'failed',
        message: "Data tidak ditemukan"
      })
    }

    await comment.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      message: "Data berhasil dihapus"
    })
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getComment,
  createComment,
  deleteComment
}