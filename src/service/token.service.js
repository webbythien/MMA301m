require("dotenv").config();
const jwt = require("jsonwebtoken");
const moment = require("moment");
const httpStatus = require("http-status");
class TokenService {
  static secret = process.env.JWT_SECRET;
  static tokenTypes = {
    ACCESS: "access",
    REFRESH: "refresh",
  };

  static generateToken = (userId, roleId, expires, type) => {
    const payload = {
      sub: userId,
      priority: roleId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, TokenService.secret);
  };

  static verifyToken = async (token) => {
    const payload = jwt.verify(token, TokenService.secret);
    const currentTime = moment().unix();
    if (currentTime > payload.exp) {
      throw new Error("Token has expired");
    }
    return payload;
  };

  static hasRole = async () => {};

  static generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(
      process.env.JWT_ACCESS_EXPIRATION_MINUTES,
      "minutes"
    );
    const accessToken = TokenService.generateToken(
      user.id,
      user.role_id,
      accessTokenExpires,
      TokenService.tokenTypes.ACCESS
    );

    const refreshTokenExpires = moment().add(
      process.env.JWT_REFRESH_EXPIRATION_DAYS,
      "days"
    );
    const refreshToken = TokenService.generateToken(
      user.id,
      user.role_id,
      refreshTokenExpires,
      TokenService.tokenTypes.REFRESH
    );

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };

  static getTokenInfo = async ({ req, token }) => {
    if (!req && !token) {
      return console.error("Provide Request or Token");
    }
    try {
      const _token = token ?? req?.headers.authorization?.split(" ")[1];
      // const is_valid_token = !!JwtService.verify(_token || '', (token_type || 'access'));
      let user = null;
      if (_token) {
        user = await TokenService.verifyToken(_token);
      }
      return {
        token: _token,
        user,
      };
    } catch (error) {
      console.log(error);
    }
  };

  // static generateResetPasswordToken = async (email) => {
  //   const user = await userService.getUserByEmail(email);
  //   if (!user) {
  //     throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  //   }
  //   const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  //   const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
  //   await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
  //   return resetPasswordToken;
  // };
}
module.exports = TokenService;
