const Joi = require("joi");

const getHost = {
    query: Joi.object().keys({
      fullName: Joi.string(),
      email: Joi.string(),
      active:Joi.boolean(),
      status:Joi.number().integer(),
      gender:Joi.number().integer(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };

  const updateHost = {
    query: Joi.object().keys({
      status:Joi.number().integer(),
    }),
  };

  module.exports = {
    getHost,
    updateHost
  };