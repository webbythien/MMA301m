require('dotenv').config()
const app =require('./src/app')
const logger = require('./src/config/logger')
const Port =process.env.PORT

app.listen(Port,()=>{
    logger.info(`Server listen on PORT: ${Port} `)
})