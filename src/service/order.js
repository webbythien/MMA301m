const mongoose = require("mongoose");
const order = require("../models/order.model");
const qr = require("../models/qr.model");
const QRCode = require("qrcode");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const qr_code = require("../models/qr_code.model");
const qr_detail = require("../models/qr_detail.model");
const qr_discount = require("../models/qr_discount.model");

class order_service {
  static updateOrder = async (id) => {
    try {
      let checkOrder = await order.findById({
        _id: new mongoose.Types.ObjectId(id),
      });
      if (!checkOrder) {
        return {
          status: "Order not found",
          statusCode: 404,
        };
      }
      checkOrder.status === false
        ? await order.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            {
              status: true,
            }
          )
        : await order.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            {
              status: false,
            }
          );
      checkOrder.status === true ??
        (await order.updateOne(
          { _id: new mongoose.Types.ObjectId(id) },
          {
            status: true,
          }
        ));
      return {
        status: "Success",
        statusCode: 200,
      };
    } catch (error) {
      return {
        status: "Error",
        statusCode: 500,
      };
    }
  };
  static getAllOrder = async (data) => {
    try {
      const data = await order.find();
      return data && data.length > 0
        ? {
            status: "Success",
            statusCode: 201,
            data: data,
          }
        : {
            status: "Not found",
            statusCode: 404,
          };
    } catch (error) {
      return {
        status: "Error",
        statusCode: 500,
      };
    }
  };
  static getOrder = async (id) => {
    try {
      let data = await order.findById({
        _id: new mongoose.Types.ObjectId(id),
      });
      return data
        ? {
            status: "Success",
            statusCode: 201,
            data: data,
          }
        : {
            status: "Not found",
            statusCode: 404,
          };
    } catch (error) {
      return {
        status: "Error",
        statusCode: 500,
      };
    }
  };
  static createOrder = async (data, customerId) => {
    try {
      const orders = [];
      for (let item of data.qrs) {
        const qrCode = uuidv4();
        const checkQr_id = await qr.findById(item.qr_id);
        const getQrCode = await qr_code.find({
          qr_id: item.qr_id,
        });
        const totalAmount = getQrCode.reduce((sum, qr) => sum + qr.amount, 0);
        if (checkQr_id.amount - totalAmount < item.amount) {
          return {
            status: "Bad Request",
            statusCode: 400,
            msg: "Not Enough Voucher QR",
          };
        }

        const QRbase64 = await new Promise((resolve, reject) => {
          QRCode.toDataURL(qrCode, function (err, code) {
            if (err) {
              reject(reject);
              return;
            }
            resolve(code);
          });
        });
        const newQrCode = await qr_code.create({
          qr_id: item.qr_id,
          amount: item.amount,
          img: QRbase64,
          code: qrCode,
        });

        const newOrder = await order.create({
          qr_code: newQrCode._id,
          qr_id: item.qr_id,
          user_id: customerId,
          price: checkQr_id.price,
          total_price: checkQr_id.price * item.amount,
          amount: item.amount,
        });
        orders.push(newOrder);
      }

      return {
        status: "Success",
        statusCode: 201,
        data: orders,
      };
    } catch (error) {
      console.log(error);
      return {
        status: "Error",
        statusCode: 500,
      };
    }
  };
}
module.exports = order_service;
