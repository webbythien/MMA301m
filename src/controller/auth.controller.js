const userService = require("../service/user.service");
const tokenService = require("../service/token.service");
const authService = require("../service/auth.service");
const httpStatus = require("http-status");

const role = require("../models/role.model");

class AuthController {
  static registerUser = async (req, res) => {
    const body = {
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.name,
      status: 1,
    };
    try {
      const user = await userService.createUser(body);
      const tokens = await tokenService.generateAuthTokens(user);
      res.status(httpStatus.CREATED).send({ user, tokens });
    } catch (error) {
       return {
        status: "Error",
        statusCode: 500,
        EM: error,
      };
    }
 
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authService.loginUserWithEmailAndPassword(
        email,
        password
      );

      const tokens = await tokenService.generateAuthTokens(user);

      
      const {
        password: userPassword,
        status,
        role_id,
        active,
        code,
        expire_code,
        ...rest
      } = user._doc;

      const hasRole = await role.findById(user.role_id);

      let roleName = null
      if (hasRole) {
        roleName= hasRole.name
      }
      res.send({ user: {...rest,role: roleName}, tokens });
    } catch (error) {
      return {
        status: "Incorrect email or password",
        statusCode: httpStatus.BAD_REQUEST,
        msg: error,
      };
    }
  };
}
module.exports = AuthController;
