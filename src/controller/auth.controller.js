const userService = require("../service/user.service");
const tokenService = require("../service/token.service");
const authService = require("../service/auth.service");
const httpStatus = require("http-status");

class AuthController {
  static registerUser = async (req, res) => {
    const body = {
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.name,
      status: 1,
    };
    const user = await userService.createUser(body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  };

  static login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );
    const tokens = await tokenService.generateAuthTokens(user);
    const { password: userPassword, status, role_id, active, code, expire_code, ...rest } = user._doc;
    res.send({ user: rest, tokens });
  };
}
module.exports = AuthController;
