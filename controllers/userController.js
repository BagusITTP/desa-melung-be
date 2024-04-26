require('dotenv').config()
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { user, tour_booking, ticket_booking } = require('../models')
const nodemailer = require('nodemailer')

// Algoritma XOR untuk enkripsi
function encrypt(number, key) {
  return number ^ key;
}

// Algoritma XOR untuk dekripsi
function decrypt(number, key) {
  return number ^ key;
}

// Membuat kunci acak
function generateRandomKey() {
  return Math.floor(Math.random() * 256);
}

let randomKey = generateRandomKey();

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const htmlBody = (otp, name) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <style>
  @media only screen and (max-width: 600px) {
    table {
      width: 100% !important;
    }

    .small-text {
      font-size: 14px !important;
    }
  }
</style>
  <body style="margin: 0; padding: 0;">

    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td>

          <table align="center" width="560" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">

            <tr>
              <td style="padding: 20px; background-color: #258752;">

                <h1 style="margin: 0; font-family: Arial; font-size: 28px; line-height: 32px; color: #ffffff;">
                  Verifikasi Akun Anda
                </h1>

              </td>
            </tr>

            <tr>
              <td style="padding: 20px; background-color: #ffffff;">

                <p style="margin: 0; font-family: Arial; font-size: 17px; line-height: 22px;">
                  Hai, ${name}
                </p>

                <p style="margin: 20px 0; font-family: Arial; font-size: 17px; line-height: 22px;">
                  Berikut adalah kode OTP untuk verifikasi akun kamu:
                </p>

                <h2 style="margin: 0; padding: 10px; background-color: #f1f1f1; font-family: Arial; font-size: 30px; line-height: 36px; text-align: center;">
                  ${otp}
                </h2>

                <p style="margin: 20px 0; font-family: Arial; font-size: 17px; line-height: 22px;">
                  Kode ini berlaku selama 10 menit.
                </p>

                <p style="margin: 0; font-family: Arial; font-size: 17px; line-height: 22px;">
                  Gunakan kode ini untuk verifikasi dan selesaikan pendaftaran akun kamu.
                </p>

              </td>
            </tr>

            <tr>
              <td style="padding: 20px; font-family: Arial; font-size: 17px; line-height: 22px; background-color: #1a5f39; color: #ffffff;">
                © ${new Date().getFullYear()} Desa Wisata Melung
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

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

const getUsers = async (req, res) => {
  const data = await user.findAll({
    include: [
      {
        model: tour_booking,
        as: 'tour_bookings'
      },
      {
        model: ticket_booking,
        as: 'ticket_bookings'
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

const getUserByUser = async (req, res) => {
  randomKey = generateRandomKey()
  const data = await user.findAll({
    where: {
      id: req.user.id
    },
    attributes: ["id", "name", "email", "phone_number", "role"]
  })

  console.log(encrypt(data[0].id, randomKey))

  try {
    if (data.length) {
      return res.status(200).json({
        status: "success",
        data: [
          {
            id: encrypt(data[0].id, randomKey),
            name: data[0].name,
            email: data[0].email,
            phone_number: data[0].phone_number,
            role: data[0].role
          }
        ]
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

const getIdEmail = async (req, res) => {
  try {
    const email = req.query.email

    const data = await user.findOne({ where: { email } }, { include: { all: true, nested: true } })

    // TODO: Validasi apakah id ada
    if (data !== null) {
      res.status(200).json({
        status: 'success',
        data
      })
    } else {
      res.status(404).json({
        status: 'failed',
        message: `Email tidak ditemukan`
      })
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
}

const getIdUser = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const data = await user.findByPk(id, {
      include: { all: true, nested: true }
    })

    // TODO: Validasi apakah id ada
    if (data !== null) {
      res.status(200).json({
        status: 'success',
        data
      })
    } else {
      res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
}

const createUser = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(2).required().label("Full Name"),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().messages({
        'string.email': "Email tidak valid"
      }),
      password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/, "password").required().messages({
        'string.pattern.base': "Password harus berisi minimal 8 karakter yang terdiri dari huruf kecil, huruf besar, angka, dan simbol."
      }),
      phone_number: Joi.string().pattern(/^(^\+62\s?|^0)(\d{10,14})$/).required().messages({
        'string.pattern.base': "Nomor telepon tidak valid"
      }),
      role: Joi.valid("admin", "user")
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
      const message = error.details[0].message;
      return res.status(400).json({
        status: 'failed',
        message,
      });
    }

    const { email, password, name, ...rest } = value

    const hashPassword = bcrypt.hashSync(password, 10)

    // TODO: email sudah ada
    const Email = await user.findOne({
      where: {
        email
      }
    })

    if (Email !== null) {
      return res.status(400).json({
        status: 'failed',
        message: `Email ${email} sudah ada`
      })
    }
    // minimal password

    await user.create({
      email,
      name,
      ...rest,
      password: hashPassword
    })

    let generatedOTP = () => {
      let digit = '0123456789'
      let OTP = ''
      for (let i = 1; i <= 6; i++) {
        OTP += digit[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }

    let otp = generatedOTP()

    await user.update({
      otp: otp,
      expiration_time: AddMinutesToDate(new Date(), 10)
    }, {
      where: {
        email
      }
    })

    const mailData = {
      from: process.env.EMAIL,
      to: email,
      subject: `OTP For Verify`,
      text: `This is Your OTP`,
      html: htmlBody(otp, name)
    }

    await transporter.sendMail(mailData, async (err, info) => {
      if (err) {
        res.status(400).json({
          status: "failed",
          message: err.message
        })
      }
      res.status(201).json({
        status: "success",
        message: `Anda berhasil register. Silahkan cek email anda untuk verify otp`,
      })
    })
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    })
  }
}

const verifyForgetPassword = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().label("email"),
      password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/, "password").required().messages({
        'string.pattern.base': "Password harus berisi minimal 8 karakter yang terdiri dari huruf kecil, huruf besar, angka, dan simbol."
      }),
      // confirm_password: Joi.any().equal(Joi.ref('password'))
      //   .required()
      //   .label('Confirm password')
      //   .messages({ 'any.only': '{{#label}} does not match' }),
      confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({ 'any.only': 'Konfirmasi password tidak sesuai dengan password' }),
      otp: Joi.string().required().label("otp")
    })
      .with("password", "confirm_password")

    const { error, value } = schema.validate(req.body)

    if (error) {
      const message = error.details[0].message;
      return res.status(400).json({
        status: 'failed',
        message,
      });
    }

    const { email, otp, password, confirm_password } = value
    const users = await user.findOne({ where: { email } })

    if (users && users.otp === otp) {
      if (password === confirm_password) {
        const hashPassword = bcrypt.hashSync(password, 10)
        await user.update({
          password: hashPassword
        }, {
          where: {
            email
          }
        })
        return res.status(200).json({
          status: 'success',
          message: `Berhasil mengubah password`
        })
      } else {
        return res.status(400).json({
          status: "failed",
          message: "Password tidak sesuai"
        })
      }
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Email dan otp tidak sesuai"
      })
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
}

const updateUser = async (req, res) => {
  let id = req.params.id
  id = decrypt(id, randomKey)
  console.log(id)

  const dataId = await user.findByPk(id)

  // TODO: Validasi apakah id ada
  if (dataId === null) {
    return res.status(404).json({
      status: 'failed',
      message: `Data tidak ditemukan`
    })
  }

  try {
    const schema = Joi.object({
      name: Joi.string().min(2).required().label("Full Name"),
      phone_number: Joi.string().pattern(/^(^\+62\s?|^0)(\d{10,14})$/, "No Telp").required().label("No Telp"),
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
      const message = error.details[0].message;
      return res.status(400).json({
        status: 'failed',
        message,
      });
    }

    await user.update(value, { where: { id } })

    return res.status(200).json({
      status: 'success',
      message: `Perubahan pengaturan akun Anda telah disimpan`
    })
  } catch (err) {
    return res.status(400).json({
      status: 'success',
      message: err.message
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = user.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      return res.status(404).json({
        status: 'failed',
        message: "Data tidak ditemukan"
      })
    }

    await user.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      message: "User berhasil dihapus"
    })
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
}

const otp = async (req, res) => {
  try {
    const email = req.body.email

    const Email = await user.findOne({
      where: {
        email
      }
    })

    if (Email === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Email ${email} tidak ada`
      })
    }

    let generatedOTP = () => {
      let digit = '0123456789'
      let OTP = ''
      for (let i = 1; i <= 6; i++) {
        OTP += digit[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }

    let otp = generatedOTP()

    await user.update({
      otp: otp,
      expiration_time: AddMinutesToDate(new Date(), 10)
    }, {
      where: {
        email
      }
    })

    const mailData = {
      from: process.env.EMAIL,
      to: email,
      subject: `OTP For Verify`,
      text: `This is Your OTP`,
      html: htmlBody(otp, Email.name)
    }

    await transporter.sendMail(mailData, async (err, info) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: err.message
        })
      }

      return res.status(200).json({
        status: 'success',
        message: "OTP sudah dikirimkan ke email anda"
      })
    })

  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
}

const verify = async (req, res) => {
  try {
    const { email, otp } = req.body
    const users = await user.findOne({ where: { email } })
    if (users) {
      if ((users.otp === otp) && (Date.parse(users.expiration_time) > Date.parse(new Date()))) {
        await user.update({
          verified: true
        }, {
          where: {
            email: email
          }
        })
        return res.status(200).json({
          status: 'success',
          message: `Anda Berhasil Verifikasi`
        })
      } else {
        return res.status(400).json({
          status: "failed",
          message: "Periksa kembali otp anda"
        })
      }
    } else {
      return res.status(404).json({
        status: "failed",
        message: "Email tidak terdaftar"
      })
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
}

const login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().label("email"),
      password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/).required().messages({
        'string.pattern.base': 'Password harus mengandung 1 huruf kecil, 1 huruf besar, 1 angka dan 1 simbol'
      })
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "failed",
        message: error.details[0].message
      });
    }

    const { email, password } = value;
    const users = await user.findOne({ where: { email } });

    if (!users) {
      return res.status(404).json({
        status: 'failed',
        message: `Data dengan email ${email}, tidak ditemukan`
      });
    }

    if (users && bcrypt.compareSync(password, users.password)) {
      if (users.verified) {
        const token = jwt.sign({
          id: users.id,
          name: users.name,
          email: users.email,
          phone_number: users.phone_number,
          role: users.role
        }, process.env.JWT_SIGNATURE_KEY);

        return res.status(200).json({
          status: 'success',
          message: `Anda berhasil login sebagai ${users.role}`,
          data: {
            token,
            role: users.role
          }
        });
      } else {
        return res.status(400).json({
          status: "failed",
          message: `Silahkan verify akun anda`
        });
      }
    } else {
      return res.status(409).json({
        status: "failed",
        message: `Periksa kembali email dan password anda`
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
};

module.exports = {
  getUsers,
  getUserByUser,
  getIdUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  otp,
  verify,
  getIdEmail,
  verifyForgetPassword
}
