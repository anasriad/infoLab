import express from 'express'
import dotenv from 'dotenv'
import log from '../utils/logger'
import applyGlobalMiddlewares from '../utils/GlobalMiddleWares'

dotenv.config()

const app = express()

applyGlobalMiddlewares(app)

app.listen(process.env.PORT, () => {
    log.info(`Server is Running on Port ${process.env.PORT}`)
})


