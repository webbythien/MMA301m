require("dotenv").config();
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");

class AuthService {
  static loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');
      // return {
      //   status: "Incorrect email or password",
      //   statusCode: httpStatus.BAD_REQUEST,
      // };
    }
    return user;
  };
}

module.exports = AuthService;
