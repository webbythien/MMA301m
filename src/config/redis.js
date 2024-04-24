require("dotenv").config();
const redis = require("redis");

const redisClient = redis.createClient({ url: process.env.REDIS_URL });

function connectRedis() {
  return new Promise(function (resolve, reject) {
    redisClient.connect(function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

connectRedis()
  .then(function () {
    console.log("Connected to Redis");
    // You can perform other operations with redisClient here
  })
  .catch(function (err) {
    console.error("Error connecting to Redis:", err);
  });

module.exports = connectRedis