const Joi = require('joi')
const { contact, contact_image } = require('../models')
const ImageKit = require('../lib/imagekit')
const nodemailer = require('nodemailer')

const htmlBody = (name, phone_number, request, message, images) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0;">

    <div style="max-width: 560px; margin: 0 auto; font-family: sans-serif;">

    <header style="background-color: #258752; padding: 20px; color: #fff;">
      <h1 style="margin: 0;">Pesan Pengguna</h1>
    </header>

    <main style="background-color: #fff; padding: 20px;">

      <p style="margin: 0;">Halo, ${name}</p>
      
      <p style="margin: 20px 0;">
        Berikut adalah pesan yang Anda kirimkan ke kami:
      </p>
      
      <p style="margin: 5px 0; font-weight: bold;">
        Nama: ${name} <br>
        No Telp: ${phone_number}<br>
        Permintaan: ${request}<br>
        Pesan: ${message}
      </p>
      
      <h3 style="margin: 20px 0 5px;">Bukti Pendukung</h3>
      
      ${images.map(image => `
        <img src="${image}" alt="Gambar 1" style="width:100%; max-width: 300px; height: auto; margin-bottom: 10px;">
      `).join('')}
      
      <p style="margin: 20px 0;">
        Terimakasih sudah mengirimkan pesan untuk kami. Permintaan Anda akan kami proses lebih lanjut. Kami akan menghubungi Anda kembali secepatnya untuk memberikan update. Terima kasih atas kerja samanya.
      </p>
      
    </main>
    
    <footer style="background-color: #1a5f39; padding: 20px; color: #fff;">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Desa Wisata Melung</p>
    </footer>

  </div>

  </body>
</html>
`

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 567,
  secure: false, // true for 465, false for other ports
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnAuthorized: true
  }
})

const getContact = async (req, res) => {
  data = await contact.findAll({
    order: [["id", "Asc"]],
    include: [
      {
        model: contact_image,
        as: 'contact_images'
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

const createContact = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required().label("Nama"),
      email: Joi.string().required().label("Email"),
      phone_number: Joi.string().required().label("Nomor Telepon"),
      request: Joi.valid("umum", "aduan", "saran").required().label("Permintaan"),
      message: Joi.string().required().label("Pesan"),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      const message = error.details[0].message;
      return res.status(400).json({ status: 'failed', message });
    }

    const { name, email, phone_number, request, message } = value;

    const data = await contact.create({ ...value });

    const images = [];

    if (req.files) {
      for (const photo of req.files) {
        const split = photo.originalname.split('.');
        const ext = split[split.length - 1];
        const img = await ImageKit.upload({
          file: photo.buffer,
          fileName: `IMG-${Date.now()}.${ext}`,
        });
        await contact_image.create({
          name: photo.originalname,
          fileId: img.fileId,
          url: img.url,
          contact_id: data.id,
        });
        images.push(img.url);
      }
    }

    const mailData = {
      from: process.env.EMAIL,
      to: email,
      subject: `Pesan Anda sudah kami terima`,
      text: `Pesan pengguna`,
      html: htmlBody(name, phone_number, request, message, images),
    };

    await transporter.sendMail(mailData, (err) => {
      if (err) {
        return res.status(400).json({ status: "failed", message: err.message });
      }
      res.status(201).json({
        status: "success",
        message: `Pesan anda berhasil dibuat. Silahkan cek email Anda untuk lebih lanjut.`,
      });
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await contact.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      return res.status(404).json({
        status: 'failed',
        message: "Data tidak ditemukan"
      })
    }

    await contact.destroy({
      where: {
        id
      }
    })

    if (dataId.contact_images) {
      for (let i = 0; i < dataId.contact_images.length; i++) {
        const photo = dataId.contact_images[i];
        await ImageKit.deleteFile(photo.fileId)
        await contact_image.destroy({
          where: {
            id: photo.id
          }
        })
      }
    }

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
  getContact,
  createContact,
  deleteContact
}