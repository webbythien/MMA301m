require("dotenv").config();

const { Emitter } =  require('@socket.io/redis-emitter');
const { createClient }  = require("redis");
const logger = require("../config/logger");

var redisClientCus = null
async function initializeRedisClient() {
    let redisURL = process.env.REDIS_URI
    if (redisURL) {
      redisClient = createClient({ url: redisURL }).on("error", (e) => {
        logger.error(`Failed to create the Redis client with error:`);
        logger.error(e);
      });
  
      try {
        await redisClient.connect();
        logger.info(`Connected to Redis successfully! ${redisURL}`);
      } catch (e) {
        logger.error(`Connection to Redis failed with error:`);
        logger.error(e);
      }
      redisClientCus= redisClient
    }
  }


  module.exports ={
    redisClientCus,
    initializeRedisClient
  }