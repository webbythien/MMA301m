// app.js

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const webApi = require('./routers/index');
const bodyParser = require('body-parser');
const instanceDB = require('./config/instance');
const {emitter, redisClient} = require('./utils/emitter')
const cors = require('cors');
const connectRedis = require('./config/redis');
const logger = require('./config/logger');
const initializeRedisClient = require('./config/redis');
const app = express();
initializeRedisClient()

  // connect to Redis
// Middleware
app.use(cors())
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined')); 
app.use(bodyParser.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

instanceDB()
// connectRedis()

// Routes
webApi(app);

module.exports = app;
