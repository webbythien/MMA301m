require("dotenv").config();

const {Emitter} = require("@socket.io/redis-emitter");
const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

const emitter = new Emitter(redisClient);

module.exports = {
  redisClient: redisClient,
  emitter: emitter,
};