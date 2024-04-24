require("dotenv").config();

const { Emitter } =  require('@socket.io/redis-emitter');
const { createClient }  = require("redis");
const logger = require("../config/logger");

const redisUrl = process.env.REDIS_URL
const redisClient = createClient({ url:redisUrl });
logger.info(`Redis URL: ${redisUrl}`);
const emitter = new Emitter(redisClient);

module.exports = {
    redisClient,
    emitter
};
