const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');

const secret = process.env.SECRET || 'secret'

const tokenTypes = {
    ACCESS: 'access',
    REFRESH: 'refresh',
    RESET_PASSWORD: 'resetPassword',
    VERIFY_EMAIL: 'verifyEmail',
};

class TokenService{
    static generateToken = (userId, roleId, expires, type) => {
        const payload = {
          sub: userId,
          priority: roleId,
          iat: moment().unix(),
          exp: expires.unix(),
          type,
        };
        return jwt.sign(payload, secret);
      };
      
    static verifyToken = async (token) => {
        const payload = jwt.verify(token, secret);
        return payload
      };
      
}
