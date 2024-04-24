const Joi = require("joi");

const   CreatQR = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().min(1).required(),
    amount: Joi.number().integer().min(1).required(),
    expire_date: Joi.date().iso().required(),
    image_url: Joi.string().required(),
    categories: Joi.array().items(
      Joi.string()
    ),
    discounts: Joi.array().items(
      Joi.object().keys({
        discount: Joi.number().required(),
        currency: Joi.string().required(),
        min_price: Joi.number().required(),
      })
    ),
    details: Joi.array().items(
      Joi.object().keys({
        detail: Joi.string().required(),
        step: Joi.number().required(),
      })
    ),
  }),
};

const BuyQR = {
  body: Joi.object().keys({
    name_recieve: Joi.string().required(),
    note: Joi.string(),
    email_recieve: Joi.string().required(),
    qrs: Joi.array().items(
      Joi.object().keys({
        qr_id: Joi.string().required(),
        amount: Joi.number().integer().min(1).required(),
      })
    )
  }),
}

const StaffManageQR = {
  body: Joi.object().keys({
    qr_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.number().integer().required(),
    amount: Joi.number().integer().required(),
    image_url:Joi.string().required(),
    categories: Joi.array().items(
      Joi.string()
    ),
    discounts: Joi.array().items(
      Joi.object().keys({
        discount: Joi.number(),
        currency: Joi.string(),
        min_price: Joi.number(),
      })
    ),
    details: Joi.array().items(
      Joi.object().keys({
        detail: Joi.string(),
        step: Joi.number(),
      })
    ),
  }),
}

const StaffBanQR = {
  body: Joi.object().keys({
    qr_id: Joi.string().required()
  }),
}

const getQRs = {
  query: Joi.object().keys({
    name: Joi.string(),
    status:Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const hostUpdateQR = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    amount: Joi.number().integer().required(),
    image_url:Joi.string().required(),
    categories: Joi.array().items(
      Joi.string()
    ),
    discounts: Joi.array().items(
      Joi.object().keys({
        discount: Joi.number(),
        currency: Joi.string(),
        min_price: Joi.number(),
      })
    ),
    details: Joi.array().items(
      Joi.object().keys({
        detail: Joi.string(),
        step: Joi.number(),
      })
    ),
  }),
};



module.exports = {
    CreatQR,
    BuyQR,
    getQRs,
    StaffManageQR,
    StaffBanQR,
    hostUpdateQR
  };
  