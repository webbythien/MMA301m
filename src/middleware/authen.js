const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const tokenService = require("../service/token.service");
const Role = require("../models/role.model");
const logger = require("../config/logger");

class AuthMiddleware {
  constructor() {}

  hasRole(role) {
    return async (req, res, next) => {
      const data = await tokenService.getTokenInfo({req});
      const user = data?.user
      logger.info(`Check role id authen: ${user?.priority}`)
      logger.info(`Check user id authen: ${user?.sub}`)
      const hasRole = await Role.findOne({ _id: user?.priority, name: role });
      req.userId = user?.sub
      return hasRole ? next() : res.status(403).send({ error: "Access Denied" });
    };
  }
}

module.exports = new AuthMiddleware();