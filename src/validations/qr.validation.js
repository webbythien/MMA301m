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



module.exports = {
    CreatQR,
    BuyQR
  };
  