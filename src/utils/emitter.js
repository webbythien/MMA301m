

const {Emitter} = require("@socket.io/redis-emitter");
const redis = require("redis");
const logger = require("../config/logger");
const dotenv = require('dotenv');
dotenv.config();

const emitterInit = async () =>{
    const redisClient = redis.createClient({
        url: process.env.REDIS_URL,
      });

      if (!redisClient.isOpen) {
          await redisClient.connect(); 
          logger.info(`connect success REDIS_URL: ${process.env.REDIS_URL}`  )
    }
      const emitter = new Emitter(redisClient);
      return emitter
}

module.exports = {
    emitterInit: emitterInit,
};