const Joi = require("joi");

const createPayment = {
  body: Joi.object().keys({
    order_ids: Joi.array().items(
       Joi.string().required(),
    )
  }),
};

module.exports = {
  createPayment,
};
