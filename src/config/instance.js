require("dotenv").config();
const logger = require("./logger");
const mongoose = require("mongoose");
///mongo env
// const MONGO_USERNAME=process.env.MONGO_USERNAME
// const MONGO_PASSWORD=process.env.MONGO_PASSWORD
// const url=`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ulsyblz.mongodb.net/MMA301`
const url = process.env.MONGODB_URL;

const instance = () => {
  const options = {
    authSource: "admin",
    maxPoolSize: 10,
    wtimeoutMS: 2500,
    // user: db_user,
    // pass: db_password,
  };

  mongoose
    .connect(url, options)
    .then(() => {
      logger.info(`Connected to DB: ${url}`);
    })
    .catch((error) => logger.error(`Failed to connect to DB: ${error}`));
};
module.exports = instance;
