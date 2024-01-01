require('dotenv').config()

const Joi = require('joi')
const {
  ticket_booking,
  attraction,
  vehicle,
  user
} = require('../models');
const midtransClient = require('midtrans-client');
const crypto = require('crypto');

function generateBookingCode() {
  const codeLength = 6;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let bookingCode = Array.from(crypto.getRandomValues(new Uint8Array(codeLength))).map((value) => characters[value % characters.length]).join('');
  return bookingCode;
}

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVERKEY,
  clientKey: process.env.CLIENTKEY
})

const getTicketBooking = async (req, res) => {
  const data = await ticket_booking.findAll({
    order: [["id", "Asc"]],
    include: [
      {
        model: vehicle,
        as: 'vehicle'
      },
      {
        model: user,
        as: 'user'
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

const getByUser = async (req, res) => {
  const data = await ticket_booking.findAll({
    order: [["id", "Asc"]],
    include: [
      {
        model: vehicle,
        as: 'vehicle'
      },
      {
        model: user,
        as: 'user'
      }
    ],
    where: {
      user_id: req.user.id
    }
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

const createTicketBooking = async (req, res) => {
  try {
    const schema = Joi.object({
      amount: Joi.number().required(),
      vehicle_id: Joi.number().required(),
      total_price: Joi.number().required()
    });

    const { error, value: datas } = schema.validate(req.body);

    if (error) {
      const message = error.details[0].message;
      return res.status(400).json({
        status: 'failed',
        message,
      });
    }

    const data = await ticket_booking.create({
      ...datas,
      user_id: req.user.id
    });

    const generateCode = (Math.random() + 1).toString(36).substring(7);
    const bookingCode = generateBookingCode();
    let dataItems = [];

    const [vehicles, attractions] = await Promise.all([
      vehicle.findByPk(datas.vehicle_id),
      attraction.findByPk(1)
    ]);

    dataItems.push({
      id: generateCode,
      name: "orang",
      quantity: datas.amount,
      price: attractions.ticket_price
    });

    dataItems.push({
      id: generateCode,
      name: vehicles.type,
      quantity: 1,
      price: vehicles.price
    });

    const transaction_details = {
      "order_id": bookingCode,
      "gross_amount": datas.total_price
    };

    const item_details = dataItems;

    const customer_details = {
      "first_name": req.user.name,
      "email": req.user.email,
      "phone": req.user.phone_number
    };

    const midtrans_params = {
      "transaction_details": transaction_details,
      "item_details": item_details,
      "customer_details": customer_details,
      "enabled_payments": ['gopay', 'shopeepay', 'bri_va']
    };

    const transaction = await snap.createTransaction(midtrans_params);

    let redirectUrl = transaction.redirect_url;
    const token = transaction.token;

    await ticket_booking.update({
      midtrans_booking_code: bookingCode,
      midtrans_token: token
    }, {
      where: {
        id: data.id
      }
    });

    return res.status(201).json({
      status: 'success',
      message: "Pesanan berhasil dibuat",
      link: redirectUrl,
      token
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};

const midtransCallback = async (req, res) => {
  try {
    let NotificationJson = {
      'currency': req.body.currency,
      'fraud_status': req.body.fraud_status,
      'gross_amount': req.body.gross_amount,
      'order_id': req.body.order_id,
      'payment_type': req.body.payment_type,
      'status_code': req.body.status_code,
      'status_message': req.body.status_message,
      'transaction_id': req.body.transaction_id,
      'transaction_status': req.body.transaction_status,
      'transaction_time': req.body.transaction_time
    }

    let data = req.method == 'POST' ? await snap.transaction.notification(NotificationJson) : await snap.transaction.status(req.query.order_id ? req.query.order_id : req.body.order_id)
    let orderId = data.order_id ? data.order_id : req.query.order_id;
    let transactionStatus = data.transaction_status ? data.transaction_status : req.query.transaction_status;
    let fraudStatus = data.fraud_status;
    const id = orderId;
    const dataId = await ticket_booking.findOne({
      where: {
        midtrans_booking_code: id
      }
    })

    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    if (transactionStatus == 'capture') {
      // capture only applies to card transaction, which you need to check for the fraudStatus
      if (fraudStatus == 'challenge') {
        // TODO set transaction status on your databaase to 'challenge'
        await ticket_booking.update({
          payment_status: fraudStatus,
        }, {
          where: {
            midtrans_booking_code: id
          }
        })
        return res.render('PaymentSuccess')
      } else if (fraudStatus == 'accept') {
        // TODO set transaction status on your databaase to 'success'
        await ticket_booking.update({
          payment_status: 'success',
        }, {
          where: {
            midtrans_booking_code: id
          }
        })
        return res.render('PaymentSuccess')
      }
    } else if (transactionStatus == 'settlement') {
      // TODO set transaction status on your databaase to 'success'
      await ticket_booking.update({
        payment_status: 'success',
      }, {
        where: {
          midtrans_booking_code: id
        }
      })
      return res.render('PaymentSuccess')
    } else if (transactionStatus == 'deny') {
      // TODO you can ignore 'deny', because most of the time it allows payment retries
      // and later can become success
      await ticket_booking.update({
        payment_status: 'deny',
      }, {
        where: {
          midtrans_booking_code: id
        }
      })
      return res.status(200).json({
        status: "success"
      })
    } else if (transactionStatus == 'cancel' ||
      transactionStatus == 'expire') {
      // TODO set transaction status on your databaase to 'failure'
      await ticket_booking.update({
        payment_status: 'failure',
      }, {
        where: {
          midtrans_booking_code: id
        }
      })
      return res.status(200).json({
        status: "success"
      })
    } else if (transactionStatus == 'pending') {
      // TODO set transaction status on your databaase to 'pending' / waiting payment
      await ticket_booking.update({
        payment_status: 'waiting',
      }, {
        where: {
          midtrans_booking_code: id
        }
      })
      return res.status(200).json({
        status: "success"
      })
    }

  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error.message,
      method: req.method
    })
  }
}

const deleteTicketBooking = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await ticket_booking.findOne({ where: { id }, include: { all: true, nested: true } })

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    await ticket_booking.destroy({ where: { id } })

    return res.status(200).json({
      status: 'success',
      message: `Data berhasil dihapus`
    })
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getTicketBooking,
  getByUser,
  createTicketBooking,
  midtransCallback,
  deleteTicketBooking
}