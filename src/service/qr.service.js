const qr = require("../models/qr.model");
const qr_code = require("../models/qr_code.model");
const qr_detail = require("../models/qr_detail.model");
const qr_discount = require("../models/qr_discount.model");
const order = require("../models/order.model");
const cateQr = require("../models/category_qr.model");
const QRCode = require('qrcode');
const mongoose = require("mongoose");
const Category_qrSchema = require("../models/category_qr.model");
const userModel = require("../models/user.model");

class QrService {
  static createQr = async (data, hostId) => {
    try {
      const newQr = await qr.create({
        name: data.name,
        price: data.price,
        status: 1,
        expire_date: data.expire_date,
        amount: data.amount,
        host_id: hostId,
        image_url:data.image_url,
      });
      for (let item of data.discounts) {
        const newDiscount = await qr_discount.create({
          qr_id: newQr._id,
          discount: item.discount,
          currency: item.currency,
          min_price: item.min_price,
          status: 1,
        });
      }
      for (let item of data.details) {
        const newDiscount = await qr_detail.create({
          qr_id: newQr._id,
          details: item.detail,
          step: item.step,
          status: 1,
        });
      }

      for(let item of data.categories){
        const newCategories = await Category_qrSchema.create({
          qr_id: newQr._id,
          category_id: item,
          status: 1,
        });
      }

      return {
        status: "Success",
        statusCode: 201,
        data: newQr,
      };
    } catch (error) {
      return {
        status: "Error",
        statusCode: 500,
        EM: error,
      };
    }
  };

  static getQrById = async (id) => {
    try {
      let currentQr = await qr.findById({ _id: new mongoose.Types.ObjectId(id) }).populate({
        path:'host_id',
        select:'-password'
      })
      const detail =await qr_detail.find({qr_id:new mongoose.Types.ObjectId(currentQr._id)})
      const discount =await qr_discount.find({qr_id:new mongoose.Types.ObjectId(currentQr._id)})
      // currentQr.check='check'
      let newData={
        ...currentQr,
        detail:detail,
        discount:discount
      }
      newData._doc.detail = newData.detail;
      newData._doc.discount = newData.discount;
      return {
        status: "Success",
        statusCode: 201,
        data: currentQr
       
      };
    } catch (error) {
      console.log(error)
      return {
        status: "Error",
        statusCode: 500,
        EM:error
      };
    }
  };

  static getQrByUser = async (userid) => {
    try {
      const getOrder = await order.find({
        user_id: userid
      });

      const result = []
      for( let item of getOrder){
        const getQR = await qr.findById(item.qr_id)
        const getQRCode = await qr_code.find({qr_id:item.qr_id})
      
        const temp ={
          name: getQR.name,
          data: getQRCode 
        }
        result.push(temp);
      }

      return {
        status: "Success",
        statusCode: 201,
        data: result,
      };
    } catch (error) {
      console.log(error)
      return {
        status: "Error",
        statusCode: 500,
      };
    }
  };

  static getAllQr = async () => {
    try {
      const allQr = await qr.find().populate({
        path:'host_id',
        select:'-password'
      }).sort({createdAt:-1}).exec()
      return {
        status: "Success",
        statusCode: 201,
        data: allQr,
      };
    } catch (error) {
      return {
        status: "Error",
        statusCode: 500,
      };
    }
  };
  static deleteQr = async (id) => {
    try {
      instance();

      const check = await qr.findByIdAndDelete({
        _id: new mongoose.Types.ObjectId(id),
      });
      if (!check) {
        return {
          status: "Item not found to delete",
          statusCode: 404,
        };
      }
      await qr_code.deleteMany({ qr_id: new mongoose.Types.ObjectId(id) });
      await qr_detail.deleteMany({ qr_id: new mongoose.Types.ObjectId(id) });
      await qr_discount.deleteMany({ qr_id: new mongoose.Types.ObjectId(id) });
      await order.deleteMany({ qr_id: new mongoose.Types.ObjectId(id) });
      await cateQr.deleteMany({ qr_id: new mongoose.Types.ObjectId(id) });
      return {
        status: "Success",
        statusCode: 204,
      };
    } catch (error) {
      console.log(error);
      return {
        status: "Error",
        statusCode: 500,
      };
    }
  };
  static updateQr = async (data, id) => {
    try {
      const updateQr = await qr.findByIdAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        {
          name: data.name,
          price: data.price,
          amount: data.amount,
          image_url:data.image_url,
          expire_date: data.expire_date
        },
        {
          new: true,
        }
      );

      if (data && Array.isArray(data.categories) && data.categories.length > 0) {
          await cateQr.deleteMany({
            qr_id:id
          })

          for(let item of data.categories){
            const newCategories = await Category_qrSchema.create({
              qr_id: id,
              category_id: item,
              status: 1,
            });
          }
      }

      if (data && Array.isArray(data.discounts) && data.discounts.length > 0) {
        await qr_discount.deleteMany({
          qr_id:id
        })

        for (let item of data.discounts) {
          const newDiscount = await qr_discount.create({
            qr_id: id,
            discount: item.discount,
            currency: item.currency,
            min_price: item.min_price,
            status: 1,
          });
        }
      }

      if (data && Array.isArray(data.details) && data.details.length > 0) {
        await qr_detail.deleteMany({
          qr_id:id
        })

        for (let item of data.details) {
          const newDiscount = await qr_detail.create({
            qr_id: id,
            details: item.detail,
            step: item.step,
            status: 1,
          });
        }
      }
      
      return updateQr
        ? {
            status: "Success",
            statusCode: 201,
            data: updateQr,
          }
        : {
            status: "Not found qr ",
            statusCode: 404,
          };
    } catch (error) {
      console.log(error);
      return {
        status: "Error",
        statusCode: 500,
      };
    }
  };

  static queryQr = async (filter, options) => {
    const qrs = await qr.paginate(filter, options);
    return qrs;
  };

  static manageStaffQr = async (req,res) => {
    try {
      const {qr_id, name,price,status,amount,image_url ,expire_date} = req.body
      console.log('check expire: ', expire_date)
      const checkQR = await qr.findById(qr_id)
      console.log('check : ',checkQR)
      if (checkQR) {
        if (checkQR.status == 2){
          return res.status(400).json({ error: 'QR have been approved cannot edit' });
        }
      }
      let approve_by = null
      let approveByName = null
      if (status == 2 ){
        approve_by= req.userId
        const getUser = await userModel.findById(req.userId)
        approveByName= getUser.fullName
      }
      const result = await qr.findOneAndUpdate(
        { _id: qr_id },
        { name, price, status, amount, image_url, approve_by,expire_date }, 
        { new: true } 
      );

      if (req.body && Array.isArray(req.body.categories) && req.body.categories.length > 0) {
          await cateQr.deleteMany({
            qr_id:qr_id
          })

          for(let item of req.body.categories){
            const newCategories = await Category_qrSchema.create({
              qr_id: qr_id,
              category_id: item,
              status: 1,
            });
          }
      }

      if (req.body && Array.isArray(req.body.discounts) && req.body.discounts.length > 0) {
        await qr_discount.deleteMany({
          qr_id:qr_id
        })

        for (let item of req.body.discounts) {
          const newDiscount = await qr_discount.create({
            qr_id: qr_id,
            discount: item.discount,
            currency: item.currency,
            min_price: item.min_price,
            status: 1,
          });
        }
      }

      if (req.body && Array.isArray(req.body.details) && req.body.details.length > 0) {
        await qr_detail.deleteMany({
          qr_id:qr_id
        })

        for (let item of req.body.details) {
          const newDiscount = await qr_detail.create({
            qr_id: qr_id,
            details: item.detail,
            step: item.step,
            status: 1,
          });
        }
      }
      if (!result) {
        return res.status(404).json({ error: 'Not found QR' });
      }

      res.json({ message: 'Update Successfully', data: {...result._doc, approve_by:approveByName } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  static StaffBanQR = async (req,res) => {
    try {
      const {qr_id} = req.body
      const status = 3
      // const approve_by = req.userId
      const result = await qr.findOneAndUpdate(
        { _id: qr_id },
        { status}, 
        { new: true } 
      );
      if (!result) {
        return res.status(404).json({ error: 'Not found QR' });
      }

      res.json({ message: 'Ban Successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
}
module.exports = QrService;
