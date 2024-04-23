const Joi = require("joi");

const createPayment = {
  body: Joi.object().keys({
    order_id: Joi.string().required(),
  }),
};